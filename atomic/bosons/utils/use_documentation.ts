import { useRouter } from 'nuxt/app'
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
  const router = useRouter()
  const categories = ref<DocCategoryInterface[]>(DOC_CATEGORIES)
  const activePage = ref<DocPageInterface | null>(null)
  const activeContent = ref<string>('')
  const loading = ref<boolean>(false)

  function updateUrl(category: string, slug: string): void {
    router.push(`/docs/${category}/${slug}`)
  }

  async function loadPage(slug: string, category: string): Promise<void> {
    const cacheKey = `${category}/${slug}`
    if (contentCache.has(cacheKey)) {
      activeContent.value = contentCache.get(cacheKey)!
      updateUrl(category, slug)
      return
    }

    loading.value = true
    activeContent.value = ''

    const onSuccess = (html: string): void => {
      contentCache.set(cacheKey, html)
      activeContent.value = html
      loading.value = false
      updateUrl(category, slug)
    }

    await loadDoc(slug, category, onSuccess)
  }

  async function prefetchPage(slug: string, category: string): Promise<void> {
    const cacheKey = `${category}/${slug}`
    if (contentCache.has(cacheKey)) return

    const onSuccess = (html: string): void => {
      contentCache.set(cacheKey, html)
    }

    await loadDoc(slug, category, onSuccess)
  }

  async function prefetchAll(): Promise<void> {
    const allPages = categories.value.flatMap((cat) =>
      cat.pages.map((page) => ({ page, category: cat.slug }))
    )
    await Promise.all(
      allPages.map(({ page, category }) => prefetchPage(page.slug, category))
    )
  }

  async function prefetchFirstPage(): Promise<void> {
    if (categories.value.length > 0 && categories.value[0].pages.length > 0) {
      const firstPage = categories.value[0].pages[0]
      const category = categories.value[0].slug
      await prefetchPage(firstPage.slug, category)
    }
  }

  function setActivePage(page: DocPageInterface): void {
    activePage.value = page
    const category = findCategoryForPage(page.slug)
    if (category) {
      loadPage(page.slug, category)
    }
  }

  function findCategoryForPage(slug: string): string {
    for (const category of categories.value) {
      if (category.pages.some((page) => page.slug === slug)) {
        return category.slug
      }
    }
    return ''
  }

  function parsePathFromUrl(
    path: string
  ): { category: string; slug: string } | null {
    if (!path || !path.startsWith('/docs/')) return null

    const pathWithoutPrefix = path.replace('/docs/', '')
    const parts = pathWithoutPrefix.split('/')
    if (parts.length < 2) return null

    const category = parts[0]
    const slug = parts[1]

    return { category, slug }
  }

  async function loadPageFromPath(path: string): Promise<boolean> {
    const parsed = parsePathFromUrl(path)
    if (!parsed) return false

    const { category, slug } = parsed
    const categoryObj = categories.value.find((cat) => cat.slug === category)
    if (!categoryObj) return false

    const page = categoryObj.pages.find((p) => p.slug === slug)
    if (!page) return false

    activePage.value = page
    await loadPage(slug, category)
    return true
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
    loadPageFromPath,
  }
}
