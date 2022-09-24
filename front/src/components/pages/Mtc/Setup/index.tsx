import * as React from "react"
import BN from "bn.js"

import { Decks } from "./Decks"
import { PowButton } from "~/components/common/PowButton"
import { InternalLink } from "~/components/common/InternalLink"
import { useAccount } from "~/components/App/ConnectionProvider/tasks"
import { Accounts } from "./Accounts"
import { ExtensionAccount } from "~/misc/accountUtils"

export function Setup(props: {
  extensionAccounts: ExtensionAccount[]
  builtEmoBaseIds: string[]
  startMtc: (deckEmoBaseIds: string[], solution?: BN) => void
  ep: number
  message: string
}) {
  const account = useAccount()
  const [hasPowButton, setHasPowButton] = React.useState(true)
  const [deck, setDeck] = React.useState<string[]>([])

  const startMtc = async (solution?: BN) => {
    setHasPowButton(false)
    props.startMtc(deck, solution)
  }

  return (
    <section className="section">
      <div className={"container"}>
        <nav className={"level"} style={{ alignItems: "flex-start" }}>
          <div className={"level-left"}>
            {account.kind === "chain" ? (
              <></>
            ) : (
              <div className={"level-item"}>
                <div>
                  See the <InternalLink to="/leaderboard">leaderboard</InternalLink>.
                </div>
              </div>
            )}
          </div>
          <div className={"level-right"}>
            <div className={"level-item"}>
              <div style={{ marginRight: "8px" }}>
                <small>
                  {account.kind === "chain" ? (
                    <>No fee is required. The popup will show the PoW solution on the tip field.</>
                  ) : (
                    <>
                      Your account needs a small amount of SDN to cover transaction fees.
                      <br />1 SDN is enough for dozens of matches.
                    </>
                  )}
                </small>
              </div>
              <div>
                {hasPowButton ? (
                  account.kind === "chain" ? (
                    <PowButton
                      account={account.session.isActive ? account.session : account.player}
                      onClick={startMtc}
                    >
                      Start
                    </PowButton>
                  ) : (
                    <button onClick={() => startMtc()} className={"button is-strong"}>
                      Start
                    </button>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </nav>
        <h1 className={"title"}>Account</h1>
        <Accounts ep={props.ep} extensionAccounts={props.extensionAccounts} />
        <div className={"block"}>
          <small>{props.message}</small>
        </div>
        <h1 className={"title"}>Deck</h1>
        <Decks builtEmoBaseIds={props.builtEmoBaseIds} setDeck={setDeck} />
      </div>
    </section>
  )
}
