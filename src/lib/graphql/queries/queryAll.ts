import gqlFetch from "../gqlFetch"

export const queryAll = async () => {
  const { data } = await gqlFetch({
    query: `
    query PokeApiSearchQuery {
        pokemon_v2_pokemon {
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

  const items = data.pokemon_v2_pokemon.map(
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

  console.log("ITEMS", items)
}
