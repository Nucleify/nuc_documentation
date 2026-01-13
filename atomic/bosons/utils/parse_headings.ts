import type { DocHeadingInterface } from '../types'

export function parseHeadings(html: string): DocHeadingInterface[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const headings = doc.querySelectorAll('h2, h3, h4, h5, h6')
  const result: DocHeadingInterface[] = []
  const stack: DocHeadingInterface[] = []

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1), 10)
    const id = heading.id || ''
    const text = heading.textContent?.trim() || ''

    if (!id || !text) return

    const headingObj: DocHeadingInterface = {
      id,
      text,
      level,
    }

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

    if (stack.length === 0) {
      result.push(headingObj)
      stack.push(headingObj)
    } else {
      const parent = stack[stack.length - 1]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(headingObj)
      stack.push(headingObj)
    }
  })

  return result
}
