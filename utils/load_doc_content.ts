import {
  DEFAULT_LANG,
  type DocContent,
  fetchDocMarkdownApi,
  markdownRawToDocContent,
} from 'nucleify'

export async function loadDocContentClient(
  category: string,
  slug: string,
  lang: string = DEFAULT_LANG
): Promise<DocContent> {
  const raw = await fetchDocMarkdownApi(lang, category, slug)
  return markdownRawToDocContent(raw)
}

export async function loadDocContent(
  category: string,
  slug: string,
  lang: string = DEFAULT_LANG
): Promise<DocContent> {
  return loadDocContentClient(category, slug, lang)
}
