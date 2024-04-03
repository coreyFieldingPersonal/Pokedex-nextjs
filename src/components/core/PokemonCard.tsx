import Link from "next/link"
import Image from "next/image"

const PokemonCard = (props) => {
  const { name, sprite, types, stats } = props
  return (
    <Link
      href={`/pokemon/${name}`}
      className={`group overflow-hidden flex w-full ring-2 ring-yellow-300/50 bg-gradient-to-br from-[#0f123c] to-[#151a56] backdrop-blur-2xl justify-center rounded-lg h-56 lg:static lg:w-auto lg:p-5`}
    >
      <div className="h-full w-full flex flex-col justify-between">
        <div className="flex justify-between text-lg border-b ">
          <span className="uppercase">{name}</span>
          <span>{stats?.length > 0 && stats[0]["stat"].value} HP</span>
        </div>

        <div className="flex justify-end align-bottom gap-x-4">
          {types?.map(({ name, idx }) => {
            const type = `text-${name}`
            return (
              <span key={idx} className={`${type} uppercase font-bold z-50`}>
                {name}
              </span>
            )
          })}
        </div>

        <Image
          src={sprite}
          width={500}
          height={500}
          onLoad={() => <p>loading</p>}
          alt={name}
          className="opacity-20 absolute top-0 z-0 right-0 group-hover:scale-125 duration-300 transition-all"
        />
      </div>
    </Link>
  )
}

export default PokemonCard
