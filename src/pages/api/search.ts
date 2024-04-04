import type { NextApiRequest, NextApiResponse } from "next"
import { queryWithParams } from "@/lib/graphql/gqlFetch"
import mapResults from "@/lib/helpers/mapResults"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query

  const data = await queryWithParams({
    variables: `where: {name: {_eq: ${name}}}`,
  })
  const results = data["pokemon_v2_pokemon"]

  const items = mapResults(results)

  res.status(200).send(items)
}
