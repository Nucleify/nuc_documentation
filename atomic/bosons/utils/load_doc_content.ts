import type { DocHeadingInterface } from '../types'

import { DEFAULT_LANG } from '../constants/languages'
import { parseHeadings } from './parse_headings'
import { parseMarkdown } from './parse_markdown'

export interface DocContent {
  html: string
  headings: DocHeadingInterface[]
}

const DOC_MARKDOWN_BY_LOOKUP = (() => {
  const map = new Map<string, string>()
  const modules = import.meta.glob('../../../content/**/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  }) as Record<string, string>
  for (const filePath of Object.keys(modules)) {
    const normalized = filePath.replaceAll('\\', '/')
    const m = normalized.match(/\/content\/([^/]+)\/([^/]+)\/([^/]+)\.md$/)
    if (!m) continue
    const [, lang, category, slug] = m
    map.set(`${lang}/${category}/${slug}`, modules[filePath])
  }
  return map
})()

function docLookupKey(lang: string, category: string, slug: string): string {
  return `${lang}/${category}/${slug}`
}

export async function loadDocContent(
  category: string,
  slug: string,
  lang: string = DEFAULT_LANG
): Promise<DocContent> {
  const raw = DOC_MARKDOWN_BY_LOOKUP.get(docLookupKey(lang, category, slug))
  if (raw === undefined) {
    throw new Error(
      `Documentation markdown not found: ${lang}/${category}/${slug}.md`
    )
  }
  const html = await parseMarkdown(raw)
  const headings = parseHeadings(html)
  return { html, headings }
}

export async function loadDocContentServer(
  category: string,
  slug: string,
  lang: string = DEFAULT_LANG
): Promise<DocContent> {
  return loadDocContent(category, slug, lang)
}

export async function loadDocContentClient(
  category: string,
  slug: string,
  lang: string = DEFAULT_LANG
): Promise<DocContent> {
  return loadDocContent(category, slug, lang)
}
