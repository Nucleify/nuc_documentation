import {
  DEFAULT_LANG,
  DOC_CATEGORIES,
  DocPageInterface,
  fetchDocMarkdownApi,
  parseMarkdown,
} from 'nucleify'

export interface UseDocumentationInterface {
  prefetchFirstPage: (lang?: string) => Promise<void>
  prefetchAll: (lang?: string) => Promise<void>
}

export function useDocumentation(): UseDocumentationInterface {
  async function prefetchFirstPage(lang: string = DEFAULT_LANG): Promise<void> {
    const firstCategory = DOC_CATEGORIES[0]
    const firstPage = firstCategory.pages[0]

    await fetchDocMarkdownApi(lang, firstCategory.slug, firstPage.slug)
  }

  async function prefetchAll(lang: string = DEFAULT_LANG): Promise<void> {
    const requests = DOC_CATEGORIES.flatMap((category) =>
      category.pages.map((page: DocPageInterface) =>
        fetchDocMarkdownApi(lang, category.slug, page.slug).then(parseMarkdown)
      )
    )

    await Promise.all(requests)
  }

  return {
    prefetchFirstPage,
    prefetchAll,
  }
}
