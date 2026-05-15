import { describe, expect, it } from 'vitest'

import {
  dedupeLeadingDocumentationHeadings,
  normalizeDocHeadingText,
} from '../atomic/bosons/utils/dedupe_doc_headings'

describe('normalizeDocHeadingText', () => {
  it('unifies punctuation variants', () => {
    expect(normalizeDocHeadingText('Umowa najmu: pytania i odpowiedzi')).toBe(
      normalizeDocHeadingText('Umowa najmu — pytania i odpowiedzi')
    )
  })
})

describe('dedupeLeadingDocumentationHeadings', () => {
  it('removes consecutive duplicate h1', () => {
    const html =
      '<h1 id="a">Same title</h1>\n<h1 id="b">Same title</h1><p>Body</p>'
    expect(dedupeLeadingDocumentationHeadings(html)).toBe(
      '<h1 id="a">Same title</h1>\n<p>Body</p>'
    )
  })

  it('removes h2 after h1 when semantic duplicate', () => {
    const html =
      '<h1 id="x">Umowa najmu: pytania i odpowiedzi</h1><h2 id="y">Umowa najmu — pytania i odpowiedzi</h2><p>x</p>'
    const out = dedupeLeadingDocumentationHeadings(html)
    expect(out).toContain('<h1 id="x">')
    expect(out).not.toContain('id="y"')
    expect(out).toContain('<p>x</p>')
  })

  it('keeps distinct headings', () => {
    const html =
      '<h1 id="a">First topic</h1><h2 id="b">Second topic</h2><p>ok</p>'
    expect(dedupeLeadingDocumentationHeadings(html)).toBe(html)
  })
})
