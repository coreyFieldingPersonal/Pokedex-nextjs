import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { offset } = req.query
  try {
    let result

    if (offset) {
      result = await (await fetch(`api/queryAll/?offset=${offset}`)).json()
    } else {
      result = await (
        await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10`)
      ).json()
    }

    res.status(200).send(result)
  } catch (err) {
    res.status(500).send({ error: "failed to fetch data" })
  }
}
