import { shuffleArray, createType, mtc_Board, mtc_GhostBoard } from "common"
import * as React from "react"

import { useIsWasmReady } from "~/components/App/Frame/tasks"
import { Connection, ConnectionContext } from "~/components/App/ConnectionProvider/tasks"
import { MtcBattleBoards } from "~/components/common/MtcBattleBoards"
import { buildEmoAttributesWithBase, findEmoBase } from "~/misc/mtcUtils"

export function DemoMtcBattle() {
  const isWasmReady = useIsWasmReady()
  const connection = React.useContext(ConnectionContext)

  if (!isWasmReady || !connection) {
    return <></>
  }

  return <Inner connection={connection} />
}

function Inner(props: { connection: Connection }) {
  const [seed, setSeed] = React.useState<string | null>(null)
  const [board, setBoard] = React.useState<mtc_Board | null>(null)
  const [ghostBoard, setGhostBoard] = React.useState<mtc_GhostBoard | null>(null)

  React.useEffect(() => {
    let isMounted = true

    props.connection.query.deckFixedEmoBaseIds().then((_ids) => {
      const ids = _ids.toArray()
      shuffleArray(ids)

      const _board = []
      const _ghostBoard = []

      for (const id of ids) {
        const base = findEmoBase(id, props.connection.emoBases)

        if (base.grade.toNumber() > 2) {
          if (_board.length < 7) {
            _board.push(
              createType("mtc_BoardEmo", {
                mtc_emo_ids: [],
                base_id: id,
                attributes: buildEmoAttributesWithBase(base),
              })
            )
            continue
          }

          if (_ghostBoard.length < 7) {
            _ghostBoard.push(
              createType("mtc_GhostBoardEmo", {
                base_id: id,
                attributes: buildEmoAttributesWithBase(base),
              })
            )
            continue
          }

          break
        }
      }

      if (isMounted) {
        setSeed(`${Math.round(Math.random() * 10000)}`)
        setBoard(createType("mtc_Board", _board))
        setGhostBoard(createType("mtc_GhostBoard", _ghostBoard))
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  if (seed === null || board === null || ghostBoard === null) {
    return <></>
  }

  return (
    <MtcBattleBoards board={board} ghostBoard={ghostBoard} seed={seed} hasReplayButton={false} />
  )
}
