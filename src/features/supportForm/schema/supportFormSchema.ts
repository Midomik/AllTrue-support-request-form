import { z } from 'zod'
import { ISSUE_TYPES, TAGS } from '../types'

export const supportFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  issueType: z.enum(ISSUE_TYPES),
  tags: z.array(z.enum(TAGS)).optional(),
  steps: z
    .array(
      z.object({
        value: z.string().min(1, 'Step cannot be empty'),
      })
    )
    .min(1, 'Add at least one step to reproduce'),
})

export type SupportFormValues = z.infer<typeof supportFormSchema>
