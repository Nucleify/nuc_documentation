import { marked } from 'marked'

import { apiHandle } from 'atomic'

export async function loadDoc(
  slug: string,
  category: string,
  onSuccess: (html: string) => void,
  onError?: () => void
): Promise<void> {
  if (!slug || !category) {
    onError?.()
    return
  }

  try {
    await apiHandle<string>({
      url:
        appUrl() + `/modules/nuc_documentation/content/${category}/${slug}.md`,
      method: 'GET',
      onSuccess: async (data: string) => {
        const html = await marked.parse(data)
        const processedHtml = html.replaceAll('/public', appUrl())
        onSuccess(processedHtml)
      },
    })
  } catch (error) {
    console.error(`Error loading documentation for ${category}/${slug}:`, error)
    onError?.()
  }
}
