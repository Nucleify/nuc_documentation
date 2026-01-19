import { DOC_LANGUAGES } from '../constants/languages'

export function getDocBasePath(lang: string): string {
  const language = DOC_LANGUAGES.find((l) => l.code === lang)
  if (!language || language.isDefault) {
    return '/docs'
  }
  return `/${lang}/docs`
}
