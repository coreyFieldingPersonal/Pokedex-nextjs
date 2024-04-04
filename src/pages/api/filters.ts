import { NextApiRequest, NextApiResponse } from "next"
import { queryWithParams } from "../../lib/graphql/gqlFetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query

  const data = await queryWithParams({
    variables: `where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: "${type}"}}}}`,
  })
  const results = data["pokemon_v2_pokemon"]

  const items = results.map(
    ({
      pokemon_v2_pokemonstats,
      pokemon_v2_pokemonabilities,
      pokemon_v2_pokemontypes,
      pokemon_v2_pokemonsprites,
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
        sprite:
          pokemon_v2_pokemonsprites[0]?.sprites["official-artwork"]
            ?.front_shiny,
        ...rest,
      }
    }
  )

  res.status(200).send(items)
}
