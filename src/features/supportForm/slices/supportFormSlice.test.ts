import { describe, it, expect } from 'vitest'
import reducer, { saveForm } from './supportFormSlice'
import type { SupportFormValues } from '../schema/supportFormSchema'
import { ISSUE_TYPES, TAGS } from '../constants'
import type { UnknownAction } from '@reduxjs/toolkit'

const makePayload = (overrides: Partial<SupportFormValues> = {}): SupportFormValues => ({
  fullName: 'John Doe',
  email: 'john@example.com',
  issueType: ISSUE_TYPES[0],
  tags: [TAGS[0]],
  steps: [{ id: 0, value: 'Open the app' }],
  ...overrides,
})

describe('supportFormSlice', () => {
  it('returns initial state on @@INIT', () => {
    const state = reducer(undefined, { type: 'unknown' } as UnknownAction)
    expect(state).toEqual({
      fullName: '',
      email: '',
      issueType: 'Bug Report',
      tags: [],
      steps: [],
    })
  })

  it('saveForm replaces state with provided payload', () => {
    const payload = makePayload()
    const state = reducer(undefined, saveForm(payload))
    expect(state).toEqual(payload)
  })

  it('saveForm allows undefined tags (schema marks tags as optional)', () => {
    const payload = makePayload({ tags: undefined })
    const state = reducer(undefined, saveForm(payload))
    expect(state.tags).toBeUndefined()
    expect(state.fullName).toBe('John Doe')
  })
})
