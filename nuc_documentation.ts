import type { App } from 'vue'

import { NucDocumentationPage } from 'nucleify'

export function registerNucDocumentation(app: App<Element>): void {
  app.component('nuc-documentation-page', NucDocumentationPage)
}
