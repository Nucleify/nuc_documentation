import { gsap } from 'gsap'
import { onUnmounted, ref } from 'vue'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface UseHeadingsInterface {
  activeHeadingId: ReturnType<typeof ref<string>>
  scrollToHeading: (id: string) => void
  setupScrollTriggers: (contentRef: HTMLElement | null) => void
  cleanupScrollTriggers: () => void
}

export function useHeadings(): UseHeadingsInterface {
  const activeHeadingId = ref('')
  const scrollTriggers: ScrollTrigger[] = []

  function scrollToHeading(id: string): void {
    const element = document.getElementById(id)
    if (!element) return

    const offset = 100
    const position =
      element.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({ top: position, behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
    activeHeadingId.value = id
  }

  function setupScrollTriggers(contentRef: HTMLElement | null): void {
    cleanupScrollTriggers()
    if (!contentRef) return

    const headingElements = Array.from(
      contentRef.querySelectorAll<HTMLElement>('h2, h3, h4, h5, h6')
    ).filter((el) => el.id)

    if (!headingElements.length) return

    const VIEWPORT_OFFSET = 150

    headingElements.forEach((element, index) => {
      const isLast = index === headingElements.length - 1
      const nextElement = headingElements[index + 1]

      const endPosition = isLast
        ? `+=${contentRef.scrollHeight - element.offsetTop}`
        : `+=${nextElement.offsetTop - element.offsetTop - 1}`

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: element,
          start: `top ${VIEWPORT_OFFSET}px`,
          end: endPosition,
          onToggle: (self) => {
            if (self.isActive) {
              activeHeadingId.value = element.id
            }
          },
        })
      )
    })

    ScrollTrigger.refresh()
    setTimeout(() => setInitialActiveHeading(headingElements), 100)
  }

  function setInitialActiveHeading(headingElements: HTMLElement[]): void {
    if (window.scrollY < 100 && headingElements[0]?.id) {
      activeHeadingId.value = headingElements[0].id
      return
    }

    const VIEWPORT_OFFSET = 150
    const activeElement =
      [...headingElements]
        .reverse()
        .find((el) => el.getBoundingClientRect().top <= VIEWPORT_OFFSET) ||
      headingElements[0]

    if (activeElement?.id) {
      activeHeadingId.value = activeElement.id
    }
  }

  function cleanupScrollTriggers(): void {
    scrollTriggers.forEach((trigger) => trigger.kill())
    scrollTriggers.length = 0
  }

  onUnmounted(cleanupScrollTriggers)

  return {
    activeHeadingId,
    scrollToHeading,
    setupScrollTriggers,
    cleanupScrollTriggers,
  }
}
