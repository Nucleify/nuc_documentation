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
          <nuxt-link
            :to="`/docs/${category.slug}/${page.slug}`"
            class="page-link"
            :class="{ active: currentSlug === page.slug }"
          >
            {{ page.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import { type DocCategoryInterface, parseDocPath } from 'atomic'

interface Props {
  categories: DocCategoryInterface[]
}

defineProps<Props>()

const route = useRoute()

const currentSlug = computed(() => parseDocPath(route.path)?.slug ?? '')
</script>

<style lang="scss" scoped>
@import 'index';
</style>
