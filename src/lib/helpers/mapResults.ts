type Results = {
  pokemon_v2_pokemonstats: {
    pokemon_v2_stat: {
      name: string
    }
    base_stat: number
  }[]
  pokemon_v2_pokemonabilities: {
    pokemon_v2_ability: string
  }[]
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: string
  }[]
  pokemon_v2_pokemonsprites: [
    {
      sprites: {
        "official-artwork": {
          front_shiny: string
          front_default: string
        }
        dream_world: {
          front_default: string
        }
      }
    }
  ]
}[]

export default function mapResults(results: Results) {
  return (
    results?.map(
      ({
        pokemon_v2_pokemonstats,
        pokemon_v2_pokemonabilities,
        pokemon_v2_pokemontypes,
        pokemon_v2_pokemonsprites,
        ...rest
      }) => {
        return {
          stats: pokemon_v2_pokemonstats.map(
            ({ pokemon_v2_stat, base_stat }) => {
              return {
                stat: {
                  name: pokemon_v2_stat.name,
                  value: base_stat,
                },
              }
            }
          ),
          abilities: pokemon_v2_pokemonabilities.map(
            ({ pokemon_v2_ability }) => pokemon_v2_ability
          ),
          types: pokemon_v2_pokemontypes.map(
            ({ pokemon_v2_type }) => pokemon_v2_type
          ),
          sprites: [
            pokemon_v2_pokemonsprites[0]?.sprites["dream_world"]
              ?.front_default ??
              pokemon_v2_pokemonsprites[0]?.sprites["official-artwork"]
                ?.front_shiny,
            pokemon_v2_pokemonsprites[0]?.sprites["official-artwork"]
              ?.front_shiny,
          ],
          ...rest,
        }
      }
    ) ?? []
  )
}
