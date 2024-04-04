export async function fetchAll() {
  const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query PokeApiQuery {
        pokemon_v2_pokemon {
          name
          height
          weight
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
          pokemon_v2_pokemonsprites {
            sprites(path: "other")
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
      }`,
    }),
  })

  const { data } = await response.json()
  return data
}

export async function queryWithParams({
  variables,
}: {
  variables?: string | undefined
}) {
  const response = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query PokeApiQuery {
        pokemon_v2_pokemon(${variables ?? ""}) {
          name
          height
          weight
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
          pokemon_v2_pokemonsprites {
            sprites(path: "other")
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
    }),
  })

  const { data } = await response.json()
  return data
}
