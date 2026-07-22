<template>
  <ad-select
    v-model="selectedPage"
    :options="pageOptions"
    nui-type="main"
    option-label="title"
    option-value="value"
    class="nuc-documentation-navbar-nav"
    append-to="body"
    :placeholder="menuLabel"
    @update:model-value="onPageChange"
  />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'nuxt/app'
import { computed, ref, watch } from 'vue'

import {
  type DocCategoryInterface,
  getDocBasePath,
  parseDocPath,
  buildDocNavOptions,
  toDocNavValue,
} from 'nucleify'

interface Props {
  categories: DocCategoryInterface[]
}

const props = defineProps<Props>()

const route = useRoute()
const router = useRouter()

const pathInfo = computed(() => parseDocPath(route.path))
const currentLang = computed(() => pathInfo.value?.lang ?? 'en')

const menuLabel = computed(() =>
  currentLang.value === 'pl' ? 'Dokumentacja' : 'Documentation'
)

const pageOptions = computed(() => buildDocNavOptions(props.categories))

const selectedPage = ref('')

watch(
  pathInfo,
  (info) => {
    selectedPage.value = info ? toDocNavValue(info.category, info.slug) : ''
  },
  { immediate: true }
)

function onPageChange(value: string | null): void {
  if (!value) return

  const [categorySlug, pageSlug] = value.split('/')
  if (!categorySlug || !pageSlug) return

  const basePath = getDocBasePath(currentLang.value)
  const target = `${basePath}/${categorySlug}/${pageSlug}`

  if (route.path !== target) {
    router.push(target)
  }
}
</script>

<style lang="scss">
@import 'index';
</style>
