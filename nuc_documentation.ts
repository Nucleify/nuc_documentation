import type { App } from 'vue'

import { NucDocumentationPage } from './atomic'

export function registerNucDocumentation(app: App<Element>): void {
  app.component('nuc-documentation-page', NucDocumentationPage)
}
