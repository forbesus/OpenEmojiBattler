export const routeIds = [
  "/",
  "/match",
  "/emo_bases",
  "/match_trial",
  "/leaderboard",
  "/dev",
  "/match_debug",
  "/emo_ability_builder",
  "/not_found",
] as const
export type RouteId = (typeof routeIds)[number]
export interface Route {
  id: RouteId
  params: Array<string>
}

export const initialPlayerHealth = 30
export const boardSize = 7
export const nextCatalogLineCoin = 1
export const emoBuyCoin = 3
export const initialEp = 300
export const mulliganCount = 2

export const emoTyps = ["Food", "Nature", "Human", "Object"] as const
export type EmoTyp = (typeof emoTyps)[number]

export const emoTypsWithAll = ["All", "Food", "Nature", "Human", "Object"] as const
export type EmoTypWithAll = (typeof emoTypsWithAll)[number]

export const shieldText = "▣"
export const attractiveText = "✪"

export const zeroAddress = "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"

export const connectionKind = ["chain", "contract"] as const
export type ConnectionKind = (typeof connectionKind)[number]
