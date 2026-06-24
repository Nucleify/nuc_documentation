import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const contentDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  '..',
  'content'
)

export async function readMarkdownFile(
  lang: string,
  category: string,
  slug: string
): Promise<string> {
  const filePath = join(contentDir, lang, category, `${slug}.md`)
  return readFile(filePath, 'utf-8')
}
