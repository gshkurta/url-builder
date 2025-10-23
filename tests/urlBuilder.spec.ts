import { describe, it, expect } from 'vitest'
import { buildUrlsFromText } from '../src/lib/urlBuilder'

const template = '{{domain_url}}/path?link={{link_id}}'

describe('buildUrlsFromText', () => {

    it('builds URLs from valid lines', () => {
        const input = `abc123;example.com\nxyz;https://sub.example.org/path/`
        const out = buildUrlsFromText(input, { template })
        expect(out).toHaveLength(2)
        expect(out[0].url).toContain('example.com')
        expect(out[1].url).toContain('sub.example.org')
    })

    it('deduplicates identical results', () => {
        const input = `a;example.com\na;example.com`
        const out = buildUrlsFromText(input, { template })
        expect(out).toHaveLength(1)
    })

    it('ignores malformed lines', () => {
        const input = `no-semicolon-line\nvalid;example.com`
        const out = buildUrlsFromText(input, { template })
        expect(out).toHaveLength(1)
        expect(out[0].title).toBe('valid')
    })

    it('returns empty for empty input', () => {
        const out = buildUrlsFromText('', { template })
        expect(out).toHaveLength(0)
    })
})
