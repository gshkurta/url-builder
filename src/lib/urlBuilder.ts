export interface BuiltUrlItem {
    url: string
    title?: string
}

export interface UrlBuilderOptions {
    template: string
}

export function buildUrlsFromText(input: string, options: UrlBuilderOptions): BuiltUrlItem[] {
    const CMS_URL = options.template
    if (!input) return []

    const lines = input
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean)

    const pairRe = /^(.*?)\s*;\s*(https?:\/\/.*|[^\s]+)$/
    const builtSet = new Map<string, BuiltUrlItem>()

    for (const line of lines) {
        const m = line.match(pairRe)
        if (!m) continue

        const rawId = (m[1] || '').trim()
        const domainRaw = (m[2] || '').trim()

        const linkId = rawId.replace(/[^a-zA-Z0-9_-]/g, '')

        let domain = domainRaw
        try {
            const maybe = domainRaw.match(/^https?:\/\//) ? domainRaw : `https://${domainRaw}`
            const u = new URL(maybe)
            domain = u.origin + u.pathname.replace(/\/$/, '')
        } catch {
            // Keep domainRaw
        }

        const built = CMS_URL.replace('{{domain_url}}', domain).replace('{{link_id}}', linkId)

        if (!builtSet.has(built)) builtSet.set(built, { url: built, title: rawId })
    }

    return Array.from(builtSet.values())
}
