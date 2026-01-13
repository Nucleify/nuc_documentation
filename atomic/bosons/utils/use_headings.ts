import { gsap } from 'gsap'
import type { Ref } from 'vue'
import { onUnmounted, ref } from 'vue'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { DocHeadingInterface } from '../types'
import { parseHeadings } from './parse_headings'

gsap.registerPlugin(ScrollTrigger)

export interface UseHeadingsInterface {
  headings: Ref<DocHeadingInterface[]>
  activeHeadingId: Ref<string>
  updateHeadings: (content: string) => void
  scrollToHeading: (id: string) => void
  setupScrollTriggers: (contentRef: HTMLElement | null) => void
  cleanupScrollTriggers: () => void
}

export function useHeadings(): UseHeadingsInterface {
  const headings = ref<DocHeadingInterface[]>([])
  const activeHeadingId = ref<string>('')
  const scrollTriggers: ScrollTrigger[] = []

  function updateHeadings(content: string): void {
    headings.value = content ? parseHeadings(content) : []
  }

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

      let endPosition: string
      if (isLast) {
        const distanceToEnd = contentRef.scrollHeight - element.offsetTop
        endPosition = `+=${distanceToEnd}`
      } else {
        const distance = nextElement.offsetTop - element.offsetTop
        endPosition = `+=${distance - 1}`
      }

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
    setTimeout(
      () => setInitialActiveHeading(headingElements, VIEWPORT_OFFSET),
      100
    )
  }

  function setInitialActiveHeading(
    headingElements: HTMLElement[],
    offset: number
  ): void {
    const activeElement =
      [...headingElements]
        .reverse()
        .find((el) => el.getBoundingClientRect().top <= offset) ||
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
    headings,
    activeHeadingId,
    updateHeadings,
    scrollToHeading,
    setupScrollTriggers,
    cleanupScrollTriggers,
  }
}
