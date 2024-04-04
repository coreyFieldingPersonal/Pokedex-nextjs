// import { Tooltip } from "@/components"
import { useRouter } from "next/router"
import Image from "next/image"
import { Suspense, useState } from "react"
import { NextRequest } from "next/server"
import handler from "@/pages/api/search"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export const getStaticPaths = async () => {
  const data = await (
    await fetch("https://pokeapi.co/api/v2/pokemon/?limit=500&offset=0")
  ).json()

  const paths =
    data?.results &&
    data?.results
      .filter((result: any) => result.url)
      .map(({ name }: any) => {
        return {
          params: {
            slug: name ? name : "",
          },
        }
      })

  return {
    paths: paths ?? null,
    fallback: false,
  }
}

export const getStaticProps = async (ctx: any) => {
  const { params } = ctx ?? {}
  const slug = params?.slug ?? ""

  const data =
    (await (
      await handler(new NextRequest(`localhost:3000/api/search/?name=${slug}`))
    ).json()) ?? []

  return {
    props: {
      slug: slug,
      ...data[0],
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

export default function Page(data: any) {
  const [open, setOpen] = useState(false)

  const { sprite, name, types, height, weight, stats } = data

  const router = useRouter()

  if (router.isFallback) {
    return <div>Catching pokemon...</div>
  } else
    return (
      <Suspense>
        <div className="font-mono px-6 lg:px-0 max-w-7xl mx-auto 2xl:max-w-7xl py-20">
          <button type="button" onClick={() => router.back()}>
            Back to Pokedex
          </button>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="border-gray-300/80 mt-10 backdrop-blur-2xl border bg-zinc-300/10 rounded-lg p-5">
              <div className="flex gap-x-8 items-end">
                <Image
                  src={sprite ? sprite : ""}
                  width={100}
                  height={100}
                  alt={name ?? ""}
                />
                {name && (
                  <h1 className="text-5xl uppercase flex flex-col items-center gap-4">
                    {name}
                  </h1>
                )}
              </div>
              <div className="flex gap-x-3 mt-5 justify-end">
                {types?.length > 0 &&
                  types?.map(({ name, idx }: { name: string; idx: number }) => (
                    <TypeBadge key={`${name}-${idx}`} type={name} />
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
              <div className="mt-4">
                <div className="text-lg border-b flex justify-between py-1">
                  <span>Height:</span> <span>{height}</span>
                </div>
                <div className="text-lg border-b flex justify-between py-1">
                  <span>Weight:</span> <span>{weight}</span>
                </div>
              </div>
            </div>
            {/* <div className="border-gray-300/80 mt-10 backdrop-blur-2xl border bg-zinc-300/10 rounded-lg p-5 flex-1">
              {stats.length > 0 && (
                <table className="w-full">
                  <tr className="mb-4">
                    {stats?.map(
                      ({ stat }: { stat: { name: string } }, idx: number) => (
                        <th key={idx} className="uppercase">
                          {stat.name.split("-").join(" ")}
                        </th>
                      )
                    )}
                  </tr>
                  <tr>
                    {stats?.map(
                      ({ base_stat }: { base_stat: string }, idx: number) => (
                        <td key={idx} className="text-lg">
                          {base_stat}
                        </td>
                      )
                    )}
                  </tr>
                </table>
              )}
            </div> */}
          </div>
        </div>
      </Suspense>
    )
}
