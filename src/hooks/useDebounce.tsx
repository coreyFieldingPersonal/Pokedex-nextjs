import { useEffect, useRef, useState } from "react"

export const useDebounce = (value: string | undefined, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>("")
  const timerRef = useRef<any | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [value, delay])

  return debouncedValue
}
