import type { Tokens } from 'marked'
import { marked } from 'marked'

import { slugify } from '.'

import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import php from 'highlight.js/lib/languages/php'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('php', php)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)

const renderer = new marked.Renderer()

renderer.heading = (token: Tokens.Heading) => {
  const level = token.depth
  const text = token.text
  const id = slugify(text)
  const tag = `h${level}`
  return `<${tag} id="${id}">${text}</${tag}>`
}

renderer.code = (token: Tokens.Code) => {
  let highlightedCode = token.text
  let hasHighlighting = false

  if (token.lang && hljs.getLanguage(token.lang)) {
    try {
      const result = hljs.highlight(token.text, {
        language: token.lang,
      })
      highlightedCode = result.value
      hasHighlighting = true
    } catch (err) {
      console.error('Highlight.js error:', err)
      highlightedCode = token.text
    }
  }

  const langClass = token.lang ? ` class="language-${token.lang}"` : ''
  const hljsClass = hasHighlighting ? ' hljs' : ''
  return `<pre><code${langClass}${hljsClass}>${highlightedCode}</code></pre>`
}

marked.setOptions({
  renderer,
})

export { marked }
