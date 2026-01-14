import { DOC_CATEGORIES } from '../constants'
import { parseMarkdown } from './parse_markdown'

export interface UseDocumentationInterface {
  prefetchFirstPage: () => Promise<void>
  prefetchAll: () => Promise<void>
}

export function useDocumentation(): UseDocumentationInterface {
  async function prefetchFirstPage(): Promise<void> {
    const firstCategory = DOC_CATEGORIES[0]
    const firstPage = firstCategory.pages[0]

    await $fetch<string>(
      appUrl() +
        `/modules/nuc_documentation/content/${firstCategory.slug}/${firstPage.slug}.md`
    )
  }

  async function prefetchAll(): Promise<void> {
    const requests = DOC_CATEGORIES.flatMap((category) =>
      category.pages.map((page) =>
        $fetch<string>(
          appUrl() +
            `/modules/nuc_documentation/content/${category.slug}/${page.slug}.md`
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
