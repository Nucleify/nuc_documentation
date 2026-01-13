<template>
  <div class="documentation-wrapper">
    <nuc-section-navbar />
    <div class="documentation-container">
      <nuc-documentation-sidebar
        :categories="categories"
        :active-page="activePage"
        @page-click="setActivePage"
      />

      <main
        v-if="!loading && activeContent"
        class="documentation-content"
      >
        <div
          ref="contentRef"
          v-sanitize-html="activeContent"
          class="doc-content"
        />
      </main>

      <nuc-documentation-toc
        :headings="headings"
        :active-heading-id="activeHeadingId"
        @heading-click="scrollToHeading"
      />
    </div>

    <div class="documentation-hexagons-container">
      <nuc-animation-hexagons />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

import {
  NucDocumentationSidebar,
  NucDocumentationToc,
  useDocumentation,
  useHeadings,
} from 'atomic'

const route = useRoute()

const {
  categories,
  activePage,
  activeContent,
  loading,
  setActivePage,
  prefetchAll,
  loadPage,
  loadPageFromPath,
} = useDocumentation()

const contentRef = ref<HTMLElement | null>(null)
const {
  headings,
  activeHeadingId,
  updateHeadings,
  scrollToHeading,
  setupScrollTriggers,
  cleanupScrollTriggers,
} = useHeadings()

watch(activeContent, () => {
  nextTick(() => {
    updateHeadings(activeContent.value)
    nextTick(() => {
      setupScrollTriggers(contentRef.value)
    })
  })
})

onMounted(async () => {
  const path = route.path

  if (path && path.startsWith('/docs/') && path !== '/docs') {
    const loaded = await loadPageFromPath(path)
    if (loaded) {
      await prefetchAll()
      nextTick(() => {
        updateHeadings(activeContent.value)
        nextTick(() => {
          setupScrollTriggers(contentRef.value)
          if (window.location.hash) {
            const id = window.location.hash.slice(1)
            scrollToHeading(id)
          }
        })
      })
      return
    }
  }

  if (categories.value.length > 0 && categories.value[0].pages.length > 0) {
    const firstPage = categories.value[0].pages[0]
    const category = categories.value[0].slug

    await loadPage(firstPage.slug, category)

    if (!activePage.value) {
      setActivePage(firstPage)
    }
  }

  await prefetchAll()

  nextTick(() => {
    updateHeadings(activeContent.value)
    nextTick(() => {
      setupScrollTriggers(contentRef.value)
      if (window.location.hash) {
        const id = window.location.hash.slice(1)
        scrollToHeading(id)
      }
    })
  })
})

onUnmounted(() => {
  cleanupScrollTriggers()
})
</script>

<style lang="scss">
@import 'highlight.js/styles/github-dark.css';
@import 'index';
</style>
