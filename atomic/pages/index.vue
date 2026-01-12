<template>
  <div class="documentation-wrapper">
    <nuc-section-navbar />
    <div class="documentation-container">
      <aside class="documentation-sidebar">
        <div
          v-for="category in categories"
          :key="category.slug"
          class="sidebar-category"
        >
          <h3 class="category-title">{{ category.name }}</h3>
          <ul class="category-pages">
            <li v-for="page in category.pages" :key="page.slug">
              <a
                class="page-link"
                :class="{ active: activePage?.slug === page.slug }"
                @click="setActivePage(page)"
              >
                {{ page.title }}
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <main class="documentation-content">
        <div v-if="loading" class="content-loading">
          <ad-progress-spinner />
        </div>

        <div v-else-if="!activePage" class="content-placeholder">
          <h2>Welcome to Documentation</h2>
          <p>Select a topic from the sidebar to get started.</p>
        </div>

        <div
          v-else
          v-sanitize-html="activeContent"
          class="doc-content"
        />
      </main>
    </div>

    <div class="documentation-hexagons-container">
      <nuc-animation-hexagons />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDocumentation } from 'atomic'

const {
  categories,
  activePage,
  activeContent,
  loading,
  setActivePage,
  prefetchAll,
  loadPage,
} = useDocumentation()

onMounted(async () => {
  if (categories.value.length > 0 && categories.value[0].pages.length > 0) {
    const firstPage = categories.value[0].pages[0]

    await loadPage(firstPage.slug)

    if (!activePage.value) {
      setActivePage(firstPage)
    }
  }

  await prefetchAll()
})
</script>

<style lang="scss">
@import 'index';
</style>
