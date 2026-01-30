import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucDocumentation(app: App<Element>): void {
  app.component('nuc-documentation-page', defineAsyncComponent({
    loader: () => import('./atomic/pages/index.vue'),
    hydrate: hydrateOnVisible({ rootMargin: '500px' }),
  }))
}
