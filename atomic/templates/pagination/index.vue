<template>
  <nav class="documentation-pagination">
    <template v-for="item in paginationItems" :key="item.type">
      <nuxt-link
        v-if="item.page"
        :to="`/docs/${item.page.category}/${item.page.slug}`"
        :class="['pagination-link', item.type]"
      >
        <span class="pagination-label">{{ item.label }}</span>
        <span class="pagination-title">
          <span v-if="item.type === 'prev'" class="pagination-arrow">←</span>
          {{ item.page.title }}
          <span v-if="item.type === 'next'" class="pagination-arrow">→</span>
        </span>
        <nuc-animation-hexagons />
      </nuxt-link>
      <div v-else class="pagination-placeholder" />
    </template>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import { DOC_CATEGORIES, parseDocPath } from 'atomic'

interface PaginationPage {
  category: string
  slug: string
  title: string
}

interface PaginationItem {
  type: 'prev' | 'next'
  label: string
  page: PaginationPage | null
}

const route = useRoute()

const flatPages = computed<PaginationPage[]>(() => {
  const pages: PaginationPage[] = []
  DOC_CATEGORIES.forEach((category) => {
    category.pages.forEach((page) => {
      pages.push({
        category: category.slug,
        slug: page.slug,
        title: page.title,
      })
    })
  })
  return pages
})

const currentIndex = computed(() => {
  const pathInfo = parseDocPath(route.path)
  if (!pathInfo) return -1
  return flatPages.value.findIndex(
    (p) => p.category === pathInfo.category && p.slug === pathInfo.slug
  )
})

const paginationItems = computed<PaginationItem[]>(() => [
  {
    type: 'prev',
    label: 'Previous',
    page:
      currentIndex.value > 0 ? flatPages.value[currentIndex.value - 1] : null,
  },
  {
    type: 'next',
    label: 'Next',
    page:
      currentIndex.value >= 0 && currentIndex.value < flatPages.value.length - 1
        ? flatPages.value[currentIndex.value + 1]
        : null,
  },
])
</script>

<style lang="scss">
@import 'index';
</style>

