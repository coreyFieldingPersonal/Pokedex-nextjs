import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"

// Import Components.
import { PokemonCard } from ".."

// Import Hooks.
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

// Import Types.
import { PokemonType } from "@/types/pokemonTypeEnum"

const FETCH_AMOUNT = 10

type Result = {
  name: string
  types: keyof typeof PokemonType
  stats: Record<string, { value: number }>[]
  sprites: string[]
}

export type Results = Result[]

interface IResultsGrid {
  results: Results
  setResults: Dispatch<SetStateAction<Results>>
}

/**
 *
 * @param results
 * @param setResults
 *
 * Display results in grid format with lazy loading on scroll.
 */
const LazyLoadGrid: React.FC<IResultsGrid> = ({ results, setResults }) => {
  const [offset, setOffset] = useState(FETCH_AMOUNT)

  const [ref, visible] = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 1,
  })

  const loadMoreResults = useCallback(async () => {
    const newResults = await (
      await fetch(`/api/pagination/?offset=${offset}`)
    ).json()

    setResults((prevState: any[]) => [...prevState, ...newResults])

    setOffset(offset + FETCH_AMOUNT)
  }, [offset])

  // Lazy load results on scroll
  useEffect(() => {
    visible && loadMoreResults()
  }, [visible])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full mt-20">
        {results?.length > 0 &&
          results?.map((item, idx) => {
            return (
              <>
                <PokemonCard key={`${item.name}-${idx}`} {...item} />
                {results[results.length - 1] == results[idx] && (
                  <div
                    // @ts-ignore
                    ref={ref}
                    className="group overflow-hidden flex items-center w-full ring-2 ring-yellow-300/50 bg-gradient-to-br from-[#0f123c] to-[#151a56] backdrop-blur-2xl justify-center rounded-lg h-56 lg:static lg:w-auto p-5 animate-pulse"
                  >
                    Catching more pokemon...
                  </div>
                )}
              </>
            )
          })}
      </div>
    </>
  )
}

export default LazyLoadGrid
