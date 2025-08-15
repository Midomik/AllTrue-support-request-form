import { describe, it, expect } from 'vitest'
import { supportFormSchema, type SupportFormValues } from './supportFormSchema'
import { ISSUE_TYPES, TAGS } from '../constants'

const makeValid = (overrides: Partial<SupportFormValues> = {}): SupportFormValues => ({
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  issueType: ISSUE_TYPES[0],
  tags: [TAGS[0]],
  steps: [{ id: 0, value: 'Open the app' }],
  ...overrides,
})

describe('supportFormSchema', () => {
  it('accepts valid data', () => {
    const data = makeValid()
    const res = supportFormSchema.safeParse(data)
    expect(res.success).toBe(true)
  })

  it('requires fullName', () => {
    const res = supportFormSchema.safeParse(makeValid({ fullName: '' }))
    expect(res.success).toBe(false)
    if (!res.success) {
      const msg = res.error.flatten().fieldErrors.fullName?.[0]
      expect(msg).toBe('Full name is required')
    }
  })

  it('validates email format', () => {
    const res = supportFormSchema.safeParse(makeValid({ email: 'not-an-email' }))
    expect(res.success).toBe(false)
    if (!res.success) {
      const msg = res.error.flatten().fieldErrors.email?.[0]
      expect(msg).toBe('Enter a valid email')
    }
  })

  it('rejects issueType not in enum', () => {
    const invalid = { ...makeValid(), issueType: 'Other' } as unknown
    const res = supportFormSchema.safeParse(invalid)
    expect(res.success).toBe(false)
  })

  it('requires at least one step', () => {
    const res = supportFormSchema.safeParse(makeValid({ steps: [] }))
    expect(res.success).toBe(false)
    if (!res.success) {
      expect(JSON.stringify(res.error.issues).includes('Add at least one step')).toBe(true)
    }
  })

  it('requires non-empty step value', () => {
    const res = supportFormSchema.safeParse(makeValid({ steps: [{ id: 0, value: '' }] }))
    expect(res.success).toBe(false)
    if (!res.success) {
      expect(JSON.stringify(res.error.issues).includes('Step cannot be empty')).toBe(true)
    }
  })
})
