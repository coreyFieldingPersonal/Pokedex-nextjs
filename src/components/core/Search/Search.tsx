import { Dispatch, SetStateAction } from "react"
import "./styles.css"

interface ISearchProps {
  setSearchTerm: Dispatch<SetStateAction<any>>
}
const SearchIconSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 15 15"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
      fill="#6958AD"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
)

const Search: React.FC<ISearchProps> = ({ setSearchTerm }) => (
  <div className="rounded-md bg-none w-56 h-[2.2rem] flex items-center bg-white border-zinc-400 relative ">
    <input
      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value)
      }
      placeholder="Search Pokemon"
      className="pl-8 focus:border-transparent focus:ring-0"
    />
    <span className="absolute left-2">
      <SearchIconSVG />
    </span>
  </div>
)

export default Search
