<template>
  <aside class="documentation-sidebar">
    <nav class="sidebar-nav">
      <div
        v-for="category in categories"
        :key="category.slug"
        class="sidebar-category"
      >
        <h3 class="category-title">{{ category.name }}</h3>
        <ul class="category-pages">
          <li v-for="page in category.pages" :key="page.slug">
            <nuxt-link
              :to="getPageUrl(category.slug, page.slug)"
              class="page-link"
              :class="{
                active: isPageActive(category.slug, page.slug),
              }"
            >
              {{ page.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import {
  type DocCategoryInterface,
  getDocBasePath,
  parseDocPath,
} from 'nucleify'

interface Props {
  categories: DocCategoryInterface[]
}

const props = defineProps<Props>()

const route = useRoute()

const pathInfo = computed(() => parseDocPath(route.path))
const currentLang = computed(() => pathInfo.value?.lang ?? 'en')

function getPageUrl(categorySlug: string, pageSlug: string): string {
  const basePath = getDocBasePath(currentLang.value)
  return `${basePath}/${categorySlug}/${pageSlug}`
}

function isPageActive(categorySlug: string, pageSlug: string): boolean {
  const info = pathInfo.value
  return info?.category === categorySlug && info?.slug === pageSlug
}
</script>

<style lang="scss">
@import 'index';
</style>
