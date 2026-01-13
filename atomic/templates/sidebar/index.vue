<template>
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
            @click="handlePageClick(page)"
          >
            {{ page.title }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { DocCategoryInterface, DocPageInterface } from 'atomic'

interface DocumentationSidebarProps {
  categories: DocCategoryInterface[]
  activePage: DocPageInterface | null
}

defineProps<DocumentationSidebarProps>()

const emit = defineEmits<{
  'page-click': [page: DocPageInterface]
}>()

function handlePageClick(page: DocPageInterface): void {
  window.scrollTo({ top: 0, behavior: 'instant' })
  emit('page-click', page)
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>

