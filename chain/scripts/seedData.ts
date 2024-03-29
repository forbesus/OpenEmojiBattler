import { readFileSync } from "fs"
import { connected, sudo } from "common"
import { loadEmoBases, getChainEndpointAndKeyringPair } from "common/src/scriptUtils"

import { getCurrentDataIds } from "./utils"

import availableEmoBaseIds from "../../data/availableEmoBaseIds.json"

const main = async () => {
  const { endpoint, keyringPair } = await getChainEndpointAndKeyringPair(
    process.argv[2],
    process.argv[3]
  )
  const bases = loadEmoBases(readFileSync("../../data/emoBases.json", "utf8"))

  await connected(endpoint, async (api) => {
    await sudo(
      api,
      (t) =>
        t.game.updateEmoBases(bases, availableEmoBaseIds.fixed, availableEmoBaseIds.built, true),
      keyringPair
    )

    const { baseIds, fixedIds, builtIds } = await getCurrentDataIds(api)
    console.log(baseIds, fixedIds, builtIds)
  })
}

main().catch(console.error)
