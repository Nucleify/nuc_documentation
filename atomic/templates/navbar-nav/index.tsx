'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import type { DocCategoryInterface } from 'nucleify'
import {
  AdSelect,
  buildDocNavOptions,
  getDocBasePath,
  parseDocPath,
  toDocNavValue,
} from 'nucleify'

import './_index.scss'

export interface NucDocumentationNavbarNavProps {
  categories: DocCategoryInterface[]
}

export function NucDocumentationNavbarNav({
  categories,
}: NucDocumentationNavbarNavProps) {
  const pathname = usePathname() || ''
  const router = useRouter()

  const pathInfo = useMemo(() => parseDocPath(pathname), [pathname])
  const currentLang = pathInfo?.lang ?? 'en'

  const menuLabel = currentLang === 'pl' ? 'Dokumentacja' : 'Documentation'
  const pageOptions = useMemo(
    () => buildDocNavOptions(categories),
    [categories]
  )

  const [selectedPage, setSelectedPage] = useState('')

  useEffect(() => {
    setSelectedPage(
      pathInfo ? toDocNavValue(pathInfo.category, pathInfo.slug) : ''
    )
  }, [pathInfo])

  function onPageChange(value: string | null) {
    if (!value) return

    const [categorySlug, pageSlug] = value.split('/')
    if (!categorySlug || !pageSlug) return

    const target = `${getDocBasePath(currentLang)}/${categorySlug}/${pageSlug}`

    if (pathname !== target) {
      router.push(target)
    }
  }

  return (
    <AdSelect
      value={selectedPage}
      options={pageOptions}
      adType="main"
      optionLabel="title"
      optionValue="value"
      className="nuc-documentation-navbar-nav"
      placeholder={menuLabel}
      onChange={(e) => onPageChange(e.value as string | null)}
    />
  )
}
