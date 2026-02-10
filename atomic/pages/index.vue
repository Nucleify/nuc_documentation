<template>
  <div class="documentation-wrapper">
    <nuc-section-navbar />
    <div class="documentation-container">
      <nuc-documentation-sidebar :categories="DOC_CATEGORIES" />

      <main v-if="content" class="documentation-content">
        <!-- Hidden links for prerendering all language versions -->
        <nav aria-hidden="true" class="prerender-links">
          <NuxtLink
            v-for="lang in DOC_LANGUAGES"
            :key="lang.code"
            :to="getLanguageUrl(lang.code)"
          >
            {{ lang.name }}
          </NuxtLink>
        </nav>
        <div
          ref="contentRef"
          v-sanitize-html="content"
          class="doc-content"
        />
        <nuc-documentation-pagination />
      </main>

      <nuc-documentation-toc
        :headings="headings"
        :active-heading-id="activeHeadingId ?? ''"
        @heading-click="scrollToHeading"
      />
    </div>

    <div v-if="content" class="documentation-hexagons-container">
      <nuc-animation-hexagons />
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo, onBeforeRouteUpdate, useRoute, useState } from 'nuxt/app'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

import {
  DOC_CATEGORIES,
  DOC_LANGUAGES,
  type DocHeadingInterface,
  getDocBasePath,
  loadDocContentClient,
  loadDocContentServer,
  NucDocumentationPagination,
  NucDocumentationSidebar,
  NucDocumentationToc,
  parseDocPath,
  useHeadings,
} from 'atomic'

const route = useRoute()

function getDefaultDocPath(lang: string): string {
  const basePath = getDocBasePath(lang)
  return `${basePath}/${DOC_CATEGORIES[0].slug}/${DOC_CATEGORIES[0].pages[0].slug}`
}

function isDocsRootPath(path: string): boolean {
  return (
    path === '/docs' || path === '/docs/' || /^\/[a-z]{2}\/docs\/?$/.test(path)
  )
}

function extractLangFromPath(path: string): string {
  const match = path.match(/^\/([a-z]{2})\/docs/)
  return match ? match[1] : 'en'
}

function getLanguageUrl(lang: string): string {
  const pathInfo = parseDocPath(route.path)
  if (!pathInfo) return getDocBasePath(lang)

  const basePath = getDocBasePath(lang)
  return `${basePath}/${pathInfo.category}/${pathInfo.slug}`
}

if (import.meta.client && isDocsRootPath(route.path)) {
  const lang = extractLangFromPath(route.path)
  await navigateTo(getDefaultDocPath(lang), { replace: true })
}

const contentState = useState<string>('doc-content', () => '')
const headingsState = useState<DocHeadingInterface[]>('doc-headings', () => [])

const content = computed(() => contentState.value)
const headings = computed(() => headingsState.value)

if (import.meta.server) {
  const pathInfo = parseDocPath(route.path)
  if (pathInfo) {
    try {
      const doc = await loadDocContentServer(
        pathInfo.category,
        pathInfo.slug,
        pathInfo.lang
      )
      contentState.value = doc.html
      headingsState.value = doc.headings
    } catch (e) {
      console.error('Failed to load doc:', e)
    }
  }
}

const contentRef = ref<HTMLElement | null>(null)
const { activeHeadingId, scrollToHeading, setupScrollTriggers } = useHeadings()

async function loadContent(path: string, scrollTop = false): Promise<void> {
  const pathInfo = parseDocPath(path)
  if (!pathInfo) return

  try {
    await nextTick()

    const doc = await loadDocContentClient(
      pathInfo.category,
      pathInfo.slug,
      pathInfo.lang
    )
    contentState.value = doc.html
    headingsState.value = doc.headings

    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    nextTick(() => setupScrollTriggers(contentRef.value))
  } catch (e) {
    console.error('Failed to load doc:', e)
  }
}

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    if (import.meta.client && newPath !== oldPath) {
      loadContent(newPath, true)
    }
  },
  { immediate: false }
)

onBeforeRouteUpdate(async (to) => {
  await loadContent(to.path, true)
})

onMounted(async () => {
  if (!contentState.value) {
    await loadContent(route.path)
  }

  nextTick(() => {
    setupScrollTriggers(contentRef.value)

    if (window.location.hash) {
      scrollToHeading(window.location.hash.slice(1))
    }
  })
})
</script>

<style lang="scss">
@import 'highlight.js/styles/github-dark.css';
@import 'index';
</style>
