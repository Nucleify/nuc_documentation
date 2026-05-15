import { dedupeLeadingDocumentationHeadings } from './dedupe_doc_headings'
import { marked, resetHeadingSlugCounters } from './markdown_renderer'

export async function parseMarkdown(markdown: string): Promise<string> {
  resetHeadingSlugCounters()
  const rawHtml = await marked.parse(markdown)
  const html = dedupeLeadingDocumentationHeadings(rawHtml)
  const appUrl = import.meta.client ? window.location.origin : ''

  return html
    .replaceAll('/public', appUrl)
    .replaceAll('/documentation/', '/docs/')
}
