import visible from "astro/runtime/client/visible.js"
import Link from "next/link"
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { PokemonType } from "@/types/pokemonTypeEnum"

const INITIAL_FETCH = 10

export type Results = {
  name: string
  types: keyof typeof PokemonType
  stats: Record<string, { value: number }>[]
}[]

interface IResultsGrid {
  results: Results
  setResults: Dispatch<SetStateAction<Results>>
}

/**
 *
 * @param results
 * @param setResults
 *
 * Display results in grid format with lazy loading on intersection.
 */
const ResultsGrid: React.FC<IResultsGrid> = ({ results, setResults }) => {
  const [offset, setOffset] = useState(INITIAL_FETCH)

  const [ref, visible] = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 1,
  })

  const loadMoreResults = useCallback(async () => {
    const data = await (await fetch(`/api/pagination/?offset=${offset}`)).json()
    setResults((prevState: any[]) => [...prevState, ...data])
    setOffset(offset + 10)
  }, [offset])

  // Lazy load results on scroll
  useEffect(() => {
    loadMoreResults()
  }, [visible])
  return (
    <>
      <div className="grid grid-cols-4 gap-6 w-full mt-20">
        {results?.length > 0 &&
          results?.map((item, idx) => {
            return (
              <>
                <Link
                  key={`${item.name}-${idx}`}
                  href={`/pokemon/${item.name}`}
                  className={`flex w-full ring-2 ring-yellow-300/50 bg-gradient-to-br from-[#0f123c] to-[#151a56] backdrop-blur-2xl justify-center rounded-lg h-56 lg:static lg:w-auto lg:p-5`}
                >
                  <div className="h-full w-full flex flex-col justify-between">
                    <div className="flex justify-between text-lg border-b ">
                      <span className="uppercase">{item.name}</span>
                      <span>
                        {item.stats?.length > 0 && item.stats[0]["stat"].value}{" "}
                        HP
                      </span>
                    </div>
                    <div className="flex justify-end align-bottom gap-x-4">
                      {item.types?.map(({ name, idx }) => {
                        const type = `text-${name}`
                        return (
                          <span key={idx} className={`${type} uppercase`}>
                            {name}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </Link>
              </>
            )
          })}
      </div>
      <div ref={ref} className="h-20 mt-8">
        Loading...
      </div>
    </>
  )
}

export default ResultsGrid
