import { SetStateAction, useEffect, useRef } from "react"

export const useIntersectionObserver = (selector: string, setActiveId ) => {
  const headingElementsRef = useRef({})

  useEffect(() => {
    const callback = (headings: any[]) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingElementsRef.current)

      const visibleHeadings: any[] = []
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key]
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id: string): number =>
        headingElements.findIndex((heading) => heading.id === id)

      // setActiveId(visibleHeadings.map(heading => heading.target.id))
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id)
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id),
        )
        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
    })

    const headingElements = Array.from(document.querySelectorAll(selector))
    headingElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [selector, setActiveId])
}
