import Link from "next/link"
import Image from "next/image"

// Import Types.
import { PokemonType } from "@/types/pokemonTypeEnum"

interface IPokemonCardProps {
  name: string
  sprites: string[]
  types: keyof (typeof PokemonType)[] | any
  stats: any[]
}
const PokemonCard: React.FC<IPokemonCardProps> = (props) => {
  const { name, sprites, types, stats } = props

  return (
    <Link
      href={`/pokemon/${name}`}
      className={`group overflow-hidden flex w-full ring-2 ring-yellow-300/50 bg-gradient-to-br from-[#0f123c] to-[#151a56] backdrop-blur-2xl justify-center rounded-lg h-56 lg:static lg:w-auto p-5`}
    >
      <div className="h-full w-full flex flex-col justify-between">
        <div className="flex justify-between text-lg border-b ">
          <span className="uppercase">{name}</span>
          <span>{stats?.length > 0 && stats[0]["stat"].value} HP</span>
        </div>

        <div className="flex justify-end align-bottom gap-x-4">
          {types?.map(({ name, idx }: { name: string; idx: number }) => {
            const type = `text-${name}`
            return (
              <span key={idx} className={`${type} uppercase font-bold z-50`}>
                {name}
              </span>
            )
          })}
        </div>
        {sprites && sprites?.length > 0 && (
          <>
            <Image
              src={sprites[0] ?? ""}
              width={500}
              height={500}
              onLoad={() => <p>loading</p>}
              alt={name}
              priority
              className="opacity-10 absolute top-0 z-0 right-0 group-hover:scale-110 duration-300 transition-all"
            />
            <Image
              src={sprites[1] ?? ""}
              width={80}
              height={80}
              onLoad={() => <p>loading</p>}
              alt={name}
              className="absolute left-4 bottom-4 z-0 right-0"
            />
          </>
        )}
      </div>
    </Link>
  )
}

export default PokemonCard
