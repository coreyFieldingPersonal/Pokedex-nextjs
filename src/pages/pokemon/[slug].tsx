import { Tooltip } from "@/components"
import Image from "next/image"
import { useState } from "react"

export const getStaticPaths = async () => {
  const data = await (await fetch(`https://pokeapi.co/api/v2/pokemon/`)).json()

  const paths = data.results.map((item: any) => {
    return {
      params: {
        slug: item.name,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (ctx: any) => {
  const { params } = ctx
  const slug = params.slug ?? ""

  // const data = await (await fetch(`/api/page/?name=${slug}`)).json()
  const data = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`)
  ).json()

  return {
    props: {
      slug,
      ...data,
    },
  }
}

const TypeBadge = ({ type }) => {
  const typeClasses = `bg-${type} border-${type}`

  return (
    <span
      className={`px-5 text-white py-2 flex w-fit text-sm font-bold justify-center border-2 rounded-md backdrop-blur-2xl uppercase lg:static ${typeClasses}`}
    >
      {type}
    </span>
  )
}

export default function Page(props: any) {
  const [open, setOpen] = useState(false)

  return (
    <div className="px-6 lg:px-0 max-w-5xl mx-auto 2xl:max-w-7xl py-20 font-mono">
      <h1 className="text-6xl uppercase flex items-center gap-4">
        {props.slug}
        <span className="text-xs border border-red-500 rounded-lg p-2 bg-red-400/30 h-fit">
          120 HP
        </span>
      </h1>
      <div className="mt-3 font-mono">
        <div className="flex gap-x-3">
          {props.types.map(({ type, idx }) => (
            <TypeBadge key={`${type.name}-${idx}`} type={type.name} />
          ))}
          {/* <Tooltip open={open} onOpenChange={setOpen}>
            <span className="px-5 text-white bg-green-400/40 border-green-500 py-2 flex w-fit text-sm font-bold justify-center border rounded-md backdrop-blur-2xl  lg:static ">
              Grass
            </span>
          </Tooltip>

          <span className="px-5 text-white bg-purple-400/40 border-purple-500 py-2 flex w-fit text-sm font-bold justify-center border rounded-md backdrop-blur-2xl  lg:static ">
            Poison
          </span> */}
        </div>
        <div className="border-gray-300 backdrop-blur-2xl border bg-zinc-300/20 rounded-lg p-5">
          <Image
            src={props.sprites["other"]["official-artwork"]["front_shiny"]}
            width={200}
            height={200}
            alt={props.name}
          />
        </div>
      </div>
      <div className=""></div>
    </div>
  )
}
