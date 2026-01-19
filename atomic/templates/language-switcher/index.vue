<template>
  <ad-select
    v-model="selectedLang"
    :options="DOC_LANGUAGES"
    ad-type="main"
    option-label="name"
    option-value="code"
    class="doc-language-switcher"
    @update:model-value="switchLanguage"
  />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'nuxt/app'
import { computed, ref, watch } from 'vue'

import { DOC_LANGUAGES, getDocBasePath, parseDocPath } from 'atomic'

const route = useRoute()
const router = useRouter()

const pathInfo = computed(() => parseDocPath(route.path))
const currentLang = computed(() => pathInfo.value?.lang ?? 'en')

const selectedLang = ref(currentLang.value)

watch(currentLang, (newLang) => {
  selectedLang.value = newLang
})

async function switchLanguage(newLang: string): Promise<void> {
  if (newLang === currentLang.value) return

  const info = pathInfo.value
  if (!info) return

  const basePath = getDocBasePath(newLang)
  const newPath = `${basePath}/${info.category}/${info.slug}`

  await router.push(newPath)
}
</script>

<style lang="scss">
@import 'index';
</style>
