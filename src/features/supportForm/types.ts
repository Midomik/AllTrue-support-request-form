export const ISSUE_TYPES = ['Bug Report', 'Feature Request', 'General Inquiry'] as const
export const TAGS = ['UI', 'Backend', 'Performance'] as const

export type IssueType = (typeof ISSUE_TYPES)[number]
export type Tag = (typeof TAGS)[number]
export type Step = { id?: number; value: string }
