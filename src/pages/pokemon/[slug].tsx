import { Tooltip } from "@/components"
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
      <div className="mt-6 font-mono">
        <div className="border border-gray-200 rounded-lg p-3 flex gap-x-3">
          <Tooltip open={open} onOpenChange={setOpen}>
            <span className="px-5 text-white bg-green-400/40 border-green-500 py-2 flex w-fit text-sm font-bold justify-center border rounded-md backdrop-blur-2xl  lg:static ">
              Grass 🍃
            </span>
          </Tooltip>

          <span className="px-5 text-white bg-purple-400/40 border-purple-500 py-2 flex w-fit text-sm font-bold justify-center border rounded-md backdrop-blur-2xl  lg:static ">
            Poison 🍃
          </span>
        </div>

        <span className="px-8 text-orange-500 py-2 flex w-fit text-sm font-bold justify-center border border-gray-300 bg-gradient-to-b from-zinc-200 rounded-md backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:bg-gray-200 lg:dark:bg-zinc-800/30">
          Fire 🔥
        </span>
        <span className="px-8 text-blue-500 py-2 flex w-fit text-sm font-bold justify-center border border-gray-300 bg-gradient-to-b from-zinc-200 rounded-md backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:bg-gray-200 lg:dark:bg-zinc-800/30">
          Water 💦
        </span>
        <span className="px-8 text-yellow-500 py-2 flex w-fit text-sm font-bold justify-center border border-gray-300 bg-gradient-to-b from-zinc-200 rounded-md backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:bg-gray-200 lg:dark:bg-zinc-800/30">
          Electric ⚡️
        </span>
      </div>
      <div className=""></div>
    </div>
  )
}
