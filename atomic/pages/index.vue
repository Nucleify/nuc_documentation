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

      <main
        v-if="!loading && activeContent"
        class="documentation-content"
      >
        <div
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
import { useRoute } from 'nuxt/app'
import { onMounted } from 'vue'

import { useDocumentation } from 'atomic'

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

onMounted(async () => {
  const path = route.path

  if (path && path.startsWith('/docs/') && path !== '/docs') {
    const loaded = await loadPageFromPath(path)
    if (loaded) {
      await prefetchAll()
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
})
</script>

<style lang="scss">
@import 'index';
</style>
