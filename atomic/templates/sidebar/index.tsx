'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import type { DocCategoryInterface } from 'nucleify'
import { getDocBasePath, parseDocPath } from 'nucleify'

import './_index.scss'

export interface NucDocumentationSidebarProps {
  categories: DocCategoryInterface[]
}

export function NucDocumentationSidebar({
  categories,
}: NucDocumentationSidebarProps) {
  const pathname = usePathname()

  const pathInfo = useMemo(() => parseDocPath(pathname || ''), [pathname])
  const currentLang = pathInfo?.lang ?? 'en'

  function getPageUrl(categorySlug: string, pageSlug: string): string {
    const basePath = getDocBasePath(currentLang)
    return `${basePath}/${categorySlug}/${pageSlug}`
  }

  function isPageActive(categorySlug: string, pageSlug: string): boolean {
    return pathInfo?.category === categorySlug && pathInfo?.slug === pageSlug
  }

  return (
    <aside className="documentation-sidebar">
      <nav className="sidebar-nav">
        {categories.map((category) => (
          <div key={category.slug} className="sidebar-category">
            <h3 className="category-title">{category.name}</h3>
            <ul className="category-pages">
              {category.pages.map((page) => {
                const isActive = isPageActive(category.slug, page.slug)
                return (
                  <li key={page.slug}>
                    <Link
                      href={getPageUrl(category.slug, page.slug)}
                      className={`page-link ${isActive ? 'active' : ''}`}
                    >
                      {page.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
