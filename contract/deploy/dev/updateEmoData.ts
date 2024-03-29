import { readFileSync } from "fs"
import { resolve } from "path"

import { ContractPromise } from "@polkadot/api-contract"
import { txContract, connect } from "common"
import { loadEmoBases } from "common/src/scriptUtils"
import { getEndpointAndPair } from "../utils"

const main = async () => {
  const { endpoint, keyringPair } = await getEndpointAndPair()

  const api = await connect(endpoint, false)
  const gameContract = new ContractPromise(
    api,
    readFileSync(getPathFromFileRelativePath(`../202109210_init/game.json`), "utf8"),
    JSON.parse(
      readFileSync(getPathFromFileRelativePath("./instantiatedAddress.game.local.json"), "utf8")
    )
  )

  const availableEmoBaseIds = JSON.parse(
    readFileSync(getPathFromFileRelativePath("../202109210_init/availableEmoBaseIds.json"), "utf8")
  )

  await txContract(
    gameContract,
    "updateEmoBases",
    [
      loadEmoBases(
        readFileSync(getPathFromFileRelativePath("../202109210_init/emoBases.json"), "utf8")
      ).toU8a(),
      availableEmoBaseIds.fixed,
      availableEmoBaseIds.built,
      true,
    ],
    keyringPair
  )
}

const getPathFromFileRelativePath = (path: string) => resolve(__dirname, path)

main()
  .then(() => process.exit())
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
