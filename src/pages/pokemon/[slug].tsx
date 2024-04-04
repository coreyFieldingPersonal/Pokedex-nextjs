import { Tooltip } from "@/components"
import { useRouter } from "next/router"
import Image from "next/image"
import { useState } from "react"
import { NextRequest } from "next/server"
import handler from "@/pages/api/search"

export const getStaticPaths = async () => {
  const data = await (
    await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000")
  ).json()

  const paths = data?.results
    .filter((result: any) => result.name)
    .map(({ name }: any) => {
      return {
        params: {
          slug: name ?? "",
        },
      }
    })

  return {
    paths: paths ?? null,
    fallback: false,
  }
}

export const getStaticProps = async (ctx: any) => {
  const { params } = ctx
  const slug = params.slug ?? ""

  const data =
    (await handler(
      new NextRequest(`localhost:3000/api/search/?name=bulbasaur`)
    )) ?? {}

  return {
    props: {
      slug: slug ?? "",
      ...(data ?? null),
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

export default function Page(props: any) {
  const [open, setOpen] = useState(false)

  console.log(props)

  const router = useRouter()

  if (router.isFallback) {
    return <div>Catching pokemon...</div>
  } else
    return (
      <div className="font-mono px-6 lg:px-0 max-w-7xl mx-auto 2xl:max-w-7xl py-20">
        <button type="button" onClick={() => router.back()}>
          Back to Pokedex
        </button>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="border-gray-300/80 mt-10 backdrop-blur-2xl border bg-zinc-300/10 rounded-lg p-5">
            <div className="flex gap-x-8 items-end">
              <Image
                src={
                  props?.sprites
                    ? props?.sprites["other"]["official-artwork"]["front_shiny"]
                    : ""
                }
                width={100}
                height={100}
                alt={props?.name ?? ""}
              />
              {props?.slug && (
                <h1 className="text-5xl uppercase flex flex-col items-center gap-4">
                  {props?.slug}
                </h1>
              )}
            </div>
            <div className="flex gap-x-3 mt-5 justify-end">
              {props.types?.length > 0 &&
                props.types?.map(
                  ({ type, idx }: { type: { name: string }; idx: number }) => (
                    <TypeBadge key={`${type.name}-${idx}`} type={type.name} />
                  )
                )}
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
                <span>Height:</span> <span>{props.height}</span>
              </div>
              <div className="text-lg border-b flex justify-between py-1">
                <span>Weight:</span> <span>{props.weight}</span>
              </div>
            </div>
          </div>
          <div className="border-gray-300/80 mt-10 backdrop-blur-2xl border bg-zinc-300/10 rounded-lg p-5 flex-1">
            {props.stats && (
              <table className="w-full">
                <tr className="mb-4">
                  {props.stats?.map(
                    ({ stat }: { stat: { name: string } }, idx: number) => (
                      <th key={idx} className="uppercase">
                        {stat.name.split("-").join(" ")}
                      </th>
                    )
                  )}
                </tr>
                <tr>
                  {props.stats?.map(
                    ({ base_stat }: { base_stat: string }, idx: number) => (
                      <td key={idx} className="text-lg">
                        {base_stat}
                      </td>
                    )
                  )}
                </tr>
              </table>
            )}
          </div>
        </div>
      </div>
    )
}
