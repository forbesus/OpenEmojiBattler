import * as React from "react"
import BN from "bn.js"

import { useIsWasmReady } from "~/components/App/Frame/tasks"
import { Shop } from "../../common/Mtc/Shop"
import { Battle } from "../../common/Mtc/Battle"
import { Result } from "../../common/Mtc/Result"
import type { mtc_shop_PlayerOperation } from "common"
import { useNavSetter, useWaitingSetter } from "~/components/App/Frame/tasks"
import {
  AccountContext,
  useAccountUpdater,
  ConnectionContext,
} from "~/components/App/ConnectionProvider/tasks"
import { withToggleAsync } from "~/misc/utils"
import { Loading } from "../../common/Loading"
import { getSeed, start, finishBattleAndBuildState } from "./tasks"
import { SetupWrapper } from "./SetupWrapper"
import { MtcState, ResultState } from "~/misc/mtcUtils"

type Phase = "setup" | "shop" | "battle" | "result"

export function Mtc() {
  const setNav = useNavSetter()
  const setWaiting = useWaitingSetter()
  const account = React.useContext(AccountContext)
  const updateAccount = useAccountUpdater()
  const connection = React.useContext(ConnectionContext)
  const isWasmReady = useIsWasmReady()

  const [phase, setPhase] = React.useState<Phase>("setup")
  const [mtcState, setMtcState] = React.useState<MtcState | null>(null)
  const [resultState, setResultState] = React.useState<ResultState | null>(null)

  React.useEffect(() => () => setNav(true), [])

  if (!isWasmReady || !connection) {
    return <Loading />
  }

  switch (phase) {
    case "setup":
      const startMtc = async (deckEmoBaseIds: string[], previousEp: number, solution?: BN) => {
        if (!account) {
          throw new Error("account null")
        }
        setMtcState(
          await start(connection, account, deckEmoBaseIds, setWaiting, previousEp, solution)
        )
        if (account.kind === "chain") {
          updateAccount((a) => {
            if (a.kind !== "chain") {
              throw new Error("invalid state")
            }
            return {
              ...a,
              session: { ...a.session, isActive: true },
            }
          })
        }
        setNav(false)
        setPhase("shop")
      }
      return <SetupWrapper startMtc={startMtc} />
    case "shop":
      if (!mtcState) {
        throw new Error("invalid state mtc")
      }
      if (!account) {
        throw new Error("account null")
      }
      const startBattle = (ops: mtc_shop_PlayerOperation[], solution?: BN) => {
        withToggleAsync(setWaiting, async () => {
          await connection.tx.finishMtcShop(ops, account, solution)

          const seed = await getSeed(connection, account.address)
          setMtcState({ ...mtcState, seed })
          setPhase("battle")
        })
      }
      return (
        <Shop
          mtcState={mtcState}
          setMtcState={setMtcState as any}
          startBattle={{ kind: account.kind === "chain" ? "pow" : "no-pow", fn: startBattle }}
        />
      )
    case "battle":
      if (!mtcState) {
        throw new Error("invalid state mtc")
      }
      const finish = async () => {
        if (!account) {
          throw new Error("invalid state: playerAccount null")
        }

        const r = finishBattleAndBuildState(connection, account, mtcState, connection.emoBases)
        setMtcState(r.mtcState)

        const _resultState = r.resultState
        if (_resultState) {
          const rs = await withToggleAsync(setWaiting, () => _resultState)
          setResultState(rs)
          setPhase("result")
          setNav(true)
        } else {
          setPhase("shop")
        }
      }
      return <Battle mtcState={mtcState} finish={finish} />
    case "result":
      if (!(mtcState && resultState)) {
        throw new Error("invalid state: resut state null")
      }
      const startAgain = () => {
        setPhase("setup")
        setMtcState(null)
        setResultState(null)
      }
      return <Result mtcState={mtcState} resultState={resultState} startAgain={startAgain} />
  }
}
