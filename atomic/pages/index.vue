<template>
  <div class="documentation-wrapper">
    <nuc-section-navbar />
    <div class="documentation-container">
      <nuc-documentation-sidebar :categories="DOC_CATEGORIES" />

      <main v-if="content" class="documentation-content">
        <div
          ref="contentRef"
          v-sanitize-html="content"
          class="doc-content"
        />
      </main>

      <nuc-documentation-toc
        :headings="headings"
        :active-heading-id="activeHeadingId ?? ''"
        @heading-click="scrollToHeading"
      />
    </div>

    <div class="documentation-hexagons-container">
      <nuc-animation-hexagons />
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo, useRoute, useState } from 'nuxt/app'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

import {
  DOC_CATEGORIES,
  type DocHeadingInterface,
  loadDocContentClient,
  loadDocContentServer,
  NucDocumentationSidebar,
  NucDocumentationToc,
  parseDocPath,
  useHeadings,
} from 'atomic'

const route = useRoute()

const DEFAULT_DOC_PATH = `/docs/${DOC_CATEGORIES[0].slug}/${DOC_CATEGORIES[0].pages[0].slug}`

if (import.meta.client && (route.path === '/docs' || route.path === '/docs/')) {
  await navigateTo(DEFAULT_DOC_PATH, { replace: true })
}

const contentState = useState<string>('doc-content', () => '')
const headingsState = useState<DocHeadingInterface[]>('doc-headings', () => [])

const content = computed(() => contentState.value)
const headings = computed(() => headingsState.value)

if (import.meta.server) {
  const pathInfo = parseDocPath(route.path)
  if (pathInfo) {
    try {
      const doc = await loadDocContentServer(pathInfo.category, pathInfo.slug)
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
    const doc = await loadDocContentClient(pathInfo.category, pathInfo.slug)
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
  () => route.path,
  (newPath) => {
    if (import.meta.client) loadContent(newPath, true)
  }
)

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
