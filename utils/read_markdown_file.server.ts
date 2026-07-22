import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { getBundledMarkdown } from './markdown_bundle.generated'

import { existsSync } from 'node:fs'

function resolveContentDir(): string {
  const fromModule = join(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    'content'
  )

  if (existsSync(fromModule)) {
    return fromModule
  }

  const fromCwd = resolve(process.cwd(), 'modules/nuc_documentation/content')
  if (existsSync(fromCwd)) {
    return fromCwd
  }

  return fromModule
}

export async function readMarkdownFile(
  lang: string,
  category: string,
  slug: string
): Promise<string> {
  const bundled = getBundledMarkdown(lang, category, slug)
  if (bundled !== null) {
    return bundled
  }

  const contentDir = resolveContentDir()
  const filePath = join(contentDir, lang, category, `${slug}.md`)
  return readFile(filePath, 'utf-8')
}
