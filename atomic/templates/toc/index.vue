<template>
  <aside v-if="headings.length > 0" class="documentation-toc">
    <div class="toc-container">
      <h3 class="toc-title">On this page</h3>
      <nav class="toc-nav">
        <ul class="toc-list">
          <li
            v-for="heading in headings"
            :key="heading.id"
            class="toc-item"
            :class="{
              'toc-item-active': activeHeadingId === heading.id,
              'toc-item-h2': heading.level === 2,
              'toc-item-h3': heading.level === 3,
            }"
          >
            <a
              :href="`#${heading.id}`"
              class="toc-link"
              @click.prevent="$emit('heading-click', heading.id)"
            >
              {{ heading.text }}
            </a>
            <ul
              v-if="heading.children && heading.children.length > 0"
              class="toc-sublist"
            >
              <li
                v-for="child in heading.children"
                :key="child.id"
                class="toc-item toc-item-h3"
                :class="{ 'toc-item-active': activeHeadingId === child.id }"
              >
                <a
                  :href="`#${child.id}`"
                  class="toc-link"
                  @click.prevent="$emit('heading-click', child.id)"
                >
                  {{ child.text }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { HeadingInterface } from 'atomic'

interface DocumentationTocProps {
  headings: HeadingInterface[]
  activeHeadingId: string
}

defineProps<DocumentationTocProps>()

defineEmits<{
  'heading-click': [id: string]
}>()
</script>

<style lang="scss" scoped>
@import 'index';
</style>

