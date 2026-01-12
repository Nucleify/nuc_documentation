import type { Ref } from 'vue'

export interface DocPageInterface {
  slug: string
  title: string
  category?: string
  order?: number
}

export interface DocCategoryInterface {
  name: string
  slug: string
  pages: DocPageInterface[]
  order?: number
}

export interface DocContentInterface {
  meta: DocPageInterface
  content: string
}

export interface UseDocumentationInterface {
  categories: Ref<DocCategoryInterface[]>
  activePage: Ref<DocPageInterface | null>
  activeContent: Ref<string>
  loading: Ref<boolean>
  loadPage: (slug: string) => Promise<void>
  setActivePage: (page: DocPageInterface) => void
  prefetchAll: () => Promise<void>
  prefetchFirstPage: () => Promise<void>
}
