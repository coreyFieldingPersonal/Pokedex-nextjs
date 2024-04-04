import { NextApiRequest, NextApiResponse } from "next"
import { queryWithParams } from "../../lib/graphql/gqlFetch"
import mapResults from "@/lib/helpers/mapResults"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { offset } = req.query

  const data =
    (await queryWithParams({
      variables: `limit: 10, offset: ${offset}`,
    })) ?? {}

  const results = data["pokemon_v2_pokemon"]
  const items = mapResults(results)

  res.status(200).send(items)
}
