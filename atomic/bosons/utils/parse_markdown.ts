import { marked } from './markdown_renderer'

export async function parseMarkdown(markdown: string): Promise<string> {
  const html = await marked.parse(markdown)
  const appUrl = import.meta.client ? window.location.origin : ''

  return html
    .replaceAll('/public', appUrl)
    .replaceAll('/documentation/', '/docs/')
}
