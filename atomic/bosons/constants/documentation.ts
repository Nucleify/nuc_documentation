import type { DocCategoryInterface } from '../types'

export const DOC_CATEGORIES: DocCategoryInterface[] = [
  {
    name: 'Getting Started',
    slug: 'getting-started',
    order: 1,
    pages: [
      { slug: 'introduction', title: 'Introduction', order: 1 },
      { slug: 'installation', title: 'Installation', order: 2 },
      { slug: 'quick-start', title: 'Quick Start', order: 3 },
    ],
  },
  {
    name: 'Core Concepts',
    slug: 'core-concepts',
    order: 2,
    pages: [
      { slug: 'atomic-design', title: 'Atomic Design', order: 1 },
      { slug: 'feature-sliced-design', title: 'Feature Sliced Design', order: 2 },
      { slug: 'modules', title: 'Modules', order: 3 },
      { slug: 'overriding', title: 'Overriding', order: 4 },
    ],
  },
  {
    name: 'Components',
    slug: 'components',
    order: 3,
    pages: [
      { slug: 'atoms', title: 'Atoms', order: 1 },
      { slug: 'molecules', title: 'Molecules', order: 2 },
      { slug: 'organisms', title: 'Organisms', order: 3 },
    ],
  },
]
