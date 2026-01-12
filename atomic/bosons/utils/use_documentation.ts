import { ref } from 'vue'

import { DOC_CATEGORIES } from '../constants'
import type {
  DocCategoryInterface,
  DocPageInterface,
  UseDocumentationInterface,
} from '../types'
import { loadDoc } from './load_doc'

const contentCache = new Map<string, string>()

export function useDocumentation(): UseDocumentationInterface {
  const categories = ref<DocCategoryInterface[]>(DOC_CATEGORIES)
  const activePage = ref<DocPageInterface | null>(null)
  const activeContent = ref<string>('')
  const loading = ref<boolean>(false)

  async function loadPage(slug: string): Promise<void> {
    if (contentCache.has(slug)) {
      activeContent.value = contentCache.get(slug)!
      return
    }

    loading.value = true
    activeContent.value = ''

    await loadDoc(
      slug,
      (html: string) => {
        contentCache.set(slug, html)
        activeContent.value = html
        loading.value = false
      },
      () => {
        activeContent.value = '<p>Documentation not found.</p>'
        loading.value = false
      }
    )
  }

  async function prefetchPage(slug: string): Promise<void> {
    if (contentCache.has(slug)) return

    await new Promise<void>((resolve, reject) => {
      loadDoc(
        slug,
        (html: string) => {
          contentCache.set(slug, html)
          resolve()
        },
        () => reject(new Error(`Failed to load ${slug}`))
      )
    })
  }

  async function prefetchAll(): Promise<void> {
    const allPages = categories.value.flatMap((cat) => cat.pages)
    await Promise.all(allPages.map((page) => prefetchPage(page.slug)))
  }

  async function prefetchFirstPage(): Promise<void> {
    if (categories.value.length > 0 && categories.value[0].pages.length > 0) {
      const firstPage = categories.value[0].pages[0]
      await prefetchPage(firstPage.slug)
    }
  }

  function setActivePage(page: DocPageInterface): void {
    activePage.value = page
    loadPage(page.slug)
  }

  return {
    categories,
    activePage,
    activeContent,
    loading,
    loadPage,
    setActivePage,
    prefetchAll,
    prefetchFirstPage,
  }
}
