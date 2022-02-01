import * as React from "react"

import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types"

import { withToggleAsync } from "~/misc/utils"
import { Dropdown } from "~/components/common/Dropdown"
import { useWaitingSetter } from "~/components/App/Frame/tasks"
import { useAccountSetter, useConnection } from "~/components/App/ConnectionProvider/tasks"
import { buildAndGeneratePlayerAndSessionAccounts } from "~/misc/accountUtils"

export function AccountsDropdown(props: {
  accounts: InjectedAccountWithMeta[]
  playerAddress: string
}) {
  const globalAsync = useConnection()
  const setWaiting = useWaitingSetter()
  const setAccount = useAccountSetter()

  const items = props.accounts.map((account): [string, React.ReactNode] => {
    return [
      account.address,
      <span>
        {account.meta.name || ""} {account.address}
      </span>,
    ]
  })

  const on = (address: string) => {
    if (address === props.playerAddress) {
      return
    }
    withToggleAsync(setWaiting, async () => {
      const r = await buildAndGeneratePlayerAndSessionAccounts(globalAsync, address)
      setAccount(r)
    })
  }

  return (
    <Dropdown
      items={items}
      selectedItemId={props.playerAddress}
      onItemSelection={on}
      isUp={false}
      height={null}
    />
  )
}
