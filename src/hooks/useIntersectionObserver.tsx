import { useEffect, useRef, useState } from "react"

export const useIntersectionObserver = (options: any) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
    const elementRef = ref.current

    if (elementRef) observer.observe(ref.current)

    return () => {
      if (elementRef) observer.unobserve(elementRef)
    }
  }, [ref, options])

  return [ref, visible]
}
