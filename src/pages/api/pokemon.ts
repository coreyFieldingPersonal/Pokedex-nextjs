import { queryWithParams } from "@/lib/graphql/gqlFetch"
import type { NextApiRequest, NextApiResponse } from "next"
import mapResults from "@/lib/helpers/mapResults"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = (await queryWithParams({})) ?? {}

  const results = data["pokemon_v2_pokemon"]

  const items = mapResults(results)

  res.status(200).send(items)
}
