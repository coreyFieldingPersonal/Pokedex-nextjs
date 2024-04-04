import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { Select } from ".."
import { useDebounce } from "@/hooks/useDebounce"
import { types } from "@/constants/types"
import Search from "../core/Search/Search"

interface IFiltersProps {
  initialResults: any[]
  setResults: Dispatch<SetStateAction<any>>
}

/**
 *
 * @param setResults Set filtered results.
 *
 * Display filter components.
 */
const Filters: React.FC<IFiltersProps> = ({ setResults }) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>("")
  const [filters, setFilters] = useState({
    type: "",
  })

  const debouncedValue = useDebounce(searchTerm, 1000)

  const handleFilter = useCallback(async () => {
    const typeFilterQuery = filters.type && `?type=${filters.type}`
    const results = await (
      await fetch(`/api/filters/${typeFilterQuery}`)
    ).json()

    return setResults([...results])
  }, [filters.type])

  const handleSearchFilter = useCallback(async () => {
    const searchResult = await (
      await fetch(`/api/search/?name=${debouncedValue}`)
    ).json()

    searchResult.length > 0 && setResults(searchResult)
  }, [debouncedValue, setResults])

  useEffect(() => {
    filters.type !== "" && handleFilter()
  }, [filters, handleFilter])

  useEffect(() => {
    handleSearchFilter()
  }, [debouncedValue, handleSearchFilter])

  return (
    <div className="flex gap-4 w-fit self-end items-center relative">
      <Search setSearchTerm={setSearchTerm} />
      <Select
        placeholder="Type"
        options={types}
        handleChange={(value) => setFilters({ type: value })}
      />
    </div>
  )
}

export default Filters
