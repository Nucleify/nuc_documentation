import { DOC_CATEGORIES } from '../constants/documentation'
import { DEFAULT_LANG } from '../constants/languages'
import { parseMarkdown } from './parse_markdown'

export interface UseDocumentationInterface {
  prefetchFirstPage: (lang?: string) => Promise<void>
  prefetchAll: (lang?: string) => Promise<void>
}

export function useDocumentation(): UseDocumentationInterface {
  async function prefetchFirstPage(lang: string = DEFAULT_LANG): Promise<void> {
    const firstCategory = DOC_CATEGORIES[0]
    const firstPage = firstCategory.pages[0]

    await $fetch<string>(
      appUrl() +
        `/modules/nuc_documentation/content/${lang}/${firstCategory.slug}/${firstPage.slug}.md`
    )
  }

  async function prefetchAll(lang: string = DEFAULT_LANG): Promise<void> {
    const requests = DOC_CATEGORIES.flatMap((category) =>
      category.pages.map((page) =>
        $fetch<string>(
          appUrl() +
            `/modules/nuc_documentation/content/${lang}/${category.slug}/${page.slug}.md`
        ).then(parseMarkdown)
      )
    )

    await Promise.all(requests)
  }

  return {
    prefetchFirstPage,
    prefetchAll,
  }
}
