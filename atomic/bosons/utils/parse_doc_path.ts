export interface DocPathInfo {
  category: string
  slug: string
}

export function parseDocPath(path: string): DocPathInfo | null {
  if (!path || !path.startsWith('/docs/') || path === '/docs') {
    return null
  }

  const parts = path.replace('/docs/', '').split('/')
  if (parts.length < 2) {
    return null
  }

  return {
    category: parts[0],
    slug: parts[1],
  }
}
