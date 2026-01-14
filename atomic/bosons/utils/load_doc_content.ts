import type { DocHeadingInterface } from '../types'
import { parseHeadings } from './parse_headings'
import { parseMarkdown } from './parse_markdown'

export interface DocContent {
  html: string
  headings: DocHeadingInterface[]
}

export async function loadDocContentServer(
  category: string,
  slug: string
): Promise<DocContent> {
  const { readFile } = await import('node:fs/promises')
  const { join } = await import('node:path')

  const filePath = join(
    process.cwd(),
    'modules',
    'nuc_documentation',
    'content',
    category,
    `${slug}.md`
  )

  const markdown = await readFile(filePath, 'utf-8')
  const html = await parseMarkdown(markdown)
  const headings = parseHeadings(html)

  return { html, headings }
}

export async function loadDocContentClient(
  category: string,
  slug: string
): Promise<DocContent> {
  const markdown = await $fetch<string>(
    appUrl() + `/modules/nuc_documentation/content/${category}/${slug}.md`
  )

  const html = await parseMarkdown(markdown)
  const headings = parseHeadings(html)

  return { html, headings }
}
