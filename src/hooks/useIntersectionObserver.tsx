import { useEffect, useRef, useState } from "react"

export const useIntersectionObserver = (options: any) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const callback = (entries: any) => {
    const [entry] = entries
    if (entry.isIntersecting) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)
    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [ref, options])

  return [ref, visible]
}
