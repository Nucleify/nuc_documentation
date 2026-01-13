import type { Tokens } from 'marked'
import { marked } from 'marked'

import hljs from 'highlight.js'

const renderer = new marked.Renderer()

renderer.code = (token: Tokens.Code) => {
  let highlightedCode = token.text

  if (token.lang && hljs.getLanguage(token.lang)) {
    try {
      highlightedCode = hljs.highlight(token.text, {
        language: token.lang,
      }).value
    } catch (err) {
      console.error('Highlight.js error:', err)
      highlightedCode = hljs.highlightAuto(token.text).value
    }
  } else {
    highlightedCode = hljs.highlightAuto(token.text).value
  }

  const langClass = token.lang ? ` class="language-${token.lang}"` : ''
  return `<pre><code${langClass}>${highlightedCode}</code></pre>`
}

marked.setOptions({
  renderer,
})

export { marked }
