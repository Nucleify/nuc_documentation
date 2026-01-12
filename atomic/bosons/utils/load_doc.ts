import { marked } from 'marked'

import { apiHandle } from 'atomic'

export async function loadDoc(
  slug: string,
  onSuccess: (html: string) => void,
  onError?: () => void
): Promise<void> {
  if (!slug) {
    onError?.()
    return
  }

  try {
    await apiHandle<string>({
      url: appUrl() + `/modules/nuc_documentation/content/${slug}.md`,
      method: 'GET',
      onSuccess: async (data: string) => {
        const html = await marked.parse(data)
        const processedHtml = html.replaceAll('/public', appUrl())
        onSuccess(processedHtml)
      },
    })
  } catch (error) {
    console.error(`Error loading documentation for ${slug}:`, error)
    onError?.()
  }
}
