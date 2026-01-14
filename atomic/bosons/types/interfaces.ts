export interface DocPageInterface {
  slug: string
  title: string
  category?: string
  order?: number
}

export interface DocCategoryInterface {
  name: string
  slug: string
  pages: DocPageInterface[]
  order?: number
}

export interface DocHeadingInterface {
  id: string
  text: string
  level: number
  children?: DocHeadingInterface[]
}
