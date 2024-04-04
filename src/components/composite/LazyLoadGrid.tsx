import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { PokemonType } from "@/types/pokemonTypeEnum"
import { PokemonCard } from ".."

const FETCH_AMOUNT = 10

export type Results = {
  name: string
  types: keyof typeof PokemonType
  stats: Record<string, { value: number }>[]
  sprite: string
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

    if (results.length > 0) {
      setResults((prevState: any[]) => [...prevState, ...newResults])
    }

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
            return <PokemonCard key={`${item.name}-${idx}`} {...item} />
          })}
      </div>
      {/* @ts-ignore */}
      <div ref={ref} className="h-44 mt-8">
        Loading...
      </div>
    </>
  )
}

export default LazyLoadGrid
