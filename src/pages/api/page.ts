import type { NextApiRequest, NextApiResponse } from "next"
import { queryWithParams } from "@/lib/graphql/gqlFetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query

  const data = await queryWithParams({
    variables: `where: {name: {_eq: ${name}}}`,
  })
  const results = data["pokemon_v2_pokemon"]

  const pokemonData = results?.map(
    ({
      pokemon_v2_pokemonstats,
      pokemon_v2_pokemonabilities,
      pokemon_v2_pokemontypes,
      ...rest
    }) => {
      return {
        stats: pokemon_v2_pokemonstats.map(({ pokemon_v2_stat, base_stat }) => {
          return {
            stat: {
              name: pokemon_v2_stat,
              value: base_stat,
            },
          }
        }),
        abilities: pokemon_v2_pokemonabilities.map(
          ({ pokemon_v2_ability }) => pokemon_v2_ability
        ),
        types: pokemon_v2_pokemontypes.map(
          ({ pokemon_v2_type }) => pokemon_v2_type
        ),
        ...rest,
      }
    }
  )

  res.status(200).send(pokemonData)
}
