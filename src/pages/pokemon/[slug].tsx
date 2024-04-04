// import { Tooltip } from "@/components"
import { useRouter } from "next/router"
import Image from "next/image"
import { Suspense, useState } from "react"
import { LeftArrowIcon } from "@/components/Icons/LeftArrowIcon"

export const getStaticPaths = async () => {
  const data = await (
    await fetch("https://pokeapi.co/api/v2/pokemon/?limit=400")
  ).json()

  const paths =
    data?.results &&
    data?.results.map(({ name }: any) => {
      return {
        params: {
          slug: name ?? "",
        },
      }
    })

  return {
    paths: paths ?? [],
    fallback: false,
  }
}

export const getStaticProps = async (ctx: any) => {
  const { params } = ctx ?? {}
  const slug = params?.slug ?? ""

  const data = await (
    await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`)
  ).json()

  return {
    props: {
      data: data ?? {},
    },
  }
}

const TypeBadge = ({ type }: { type: string }) => {
  const typeClasses = `bg-${type} border-${type}`

  return (
    <span
      className={`px-5 text-white py-2 flex w-fit text-xs font-bold justify-center border-2 rounded-md backdrop-blur-2xl uppercase lg:static ${typeClasses}`}
    >
      {type}
    </span>
  )
}

export default function Page({ data }: any) {
  const [open, setOpen] = useState(false)

  const { sprites, name, types, height, weight, abilities, stats } = data

  const router = useRouter()

  if (router.isFallback) {
    return <div>Catching pokemon...</div>
  } else
    return (
      <Suspense>
        <div className="font-mono px-6 lg:px-0 max-w-7xl mx-auto 2xl:max-w-7xl py-20">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex gap-x-4 items-center"
          >
            <LeftArrowIcon />
            Back to Pokedex
          </button>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="border-gray-300/80 mt-10 backdrop-blur-2xl border bg-zinc-300/10 rounded-lg p-5">
              <div className="flex gap-x-8 items-end">
                <Image
                  src={sprites.front_shiny}
                  width={150}
                  height={150}
                  alt={name ?? ""}
                />
                {name && (
                  <h1 className="text-5xl uppercase flex flex-col items-center gap-4">
                    {name}
                  </h1>
                )}
              </div>
              <div className="flex gap-x-3 mt-5 justify-end">
                {types &&
                  types?.length > 0 &&
                  types?.map(
                    ({ type }: { type: { name: string } }, idx: number) => (
                      <TypeBadge key={`${type.name}-${idx}`} type={type.name} />
                    )
                  )}
                {/* <Tooltip open={open} onOpenChange={setOpen}>
            <span className="px-5 text-white bg-green-400/40 border-green-500 py-2 flex w-fit text-sm font-bold justify-center border rounded-md backdrop-blur-2xl  lg:static ">
              Grass
            </span>
          </Tooltip> */}
              </div>
              <div className="mt-4">
                <div className="text-lg border-b flex justify-between py-1">
                  <span>Height:</span> <span>{height} m</span>
                </div>
                <div className="text-lg border-b flex justify-between py-1">
                  <span>Weight:</span> <span>{weight} lbs</span>
                </div>
              </div>
            </div>
            <div className="border-gray-300/80 mt-10 backdrop-blur-2xl border bg-zinc-300/10 rounded-lg p-5 flex-1">
              {stats &&
                stats.length > 0 &&
                stats?.map(
                  ({ stat }: { stat: { name: string } }, idx: number) => (
                    <div
                      key={idx}
                      className="uppercase flex justify-between w-full gap-6 border-b my-3 items-center"
                    >
                      <span>{stat?.name.split("-").join(" ")}</span>
                      <span>{stats[idx]["base_stat"]}</span>
                    </div>
                  )
                )}
            </div>
          </div>
          {abilities.map(({ ability, idx }) => (
            <div
              key={idx}
              className="border-gray-300/80 mt-10 backdrop-blur-2xl border bg-zinc-300/10 rounded-lg p-5 flex-1"
            >
              {ability.name}
            </div>
          ))}
        </div>
      </Suspense>
    )
}
