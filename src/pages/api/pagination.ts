import { NextApiRequest, NextApiResponse } from "next"
import gqlFetch from "../../lib/graphql/gqlFetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { offset } = req.query

  const data = await gqlFetch({
    query: `
      query PokeApiQuery {
          pokemon_v2_pokemon(limit: 10, offset: ${offset}) {
            name
            height
            id
            pokemon_v2_pokemonstats {
              pokemon_v2_stat {
                name
              }
              base_stat
            }
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
            pokemon_v2_pokemonabilities {
              pokemon_v2_ability {
                name
                pokemon_v2_abilityeffecttexts {
                  effect
                }
              }
            }
          }
        }
      `,
  })

  const items = data["pokemon_v2_pokemon"].map(
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

  res.status(200).send(items)
}
