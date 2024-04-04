import { Dispatch, SetStateAction } from "react"
import { SearchIcon } from "@/components/Icons/SearchIcon"
interface ISearchProps {
  setSearchTerm: Dispatch<SetStateAction<any>>
}

const Search: React.FC<ISearchProps> = ({ setSearchTerm }) => (
  <div className="rounded-md bg-none w-56 h-[2.2rem] flex items-center bg-white border-zinc-400 relative ">
    <input
      id="search"
      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value)
      }
      placeholder="Search Pokemon"
      className="pl-8 focus:border-transparent focus:ring-0"
    />
    <span className="absolute left-2">
      <SearchIcon />
    </span>
  </div>
)

export default Search
