import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form'
import { type IssueType, type Tag } from '../types'
import { ISSUE_TYPES, TAGS } from '../constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { supportFormSchema, type SupportFormValues } from '../schema/supportFormSchema'
import { useAppDispatch } from '../../../app/hooks'
import { saveForm } from '../slices/supportFormSlice'
import ErrorText from '../components/ErrorText'

export default function SupportFormPage() {

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema)
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'steps' })
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<SupportFormValues> = (data) => {
    const payload: SupportFormValues = {
      fullName: data.fullName,
      email: data.email,
      issueType: data.issueType,
      tags: data.tags ?? [],
      steps: data.steps.map((s, idx) => ({ id: idx, value: s.value })),
    }
    dispatch(saveForm(payload))
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-6">Support Request</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full name */}
        <div>
          <label htmlFor="fullName" className="label mb-1">
            Full name
          </label>
          <input
            id="fullName"
            className="input"
            placeholder="Jane Doe"
            {...register('fullName')}
          />
          <ErrorText text={errors.fullName?.message} />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="label mb-1">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="input"
            placeholder="jane@example.com"
            {...register('email')}
          />
          <ErrorText text={errors.email?.message} />
        </div>

        {/* Issue type */}
        <div>
          <label htmlFor="issueType" className="label mb-1">
            Issue type
          </label>
          <select
            id="issueType"
            className="select"
            {...register('issueType')}
          >
            {ISSUE_TYPES.map((t: IssueType) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ErrorText text={errors.issueType?.message} />
        </div>

        {/* Tags */}
        <div>
          <span className="label mb-1">Tags</span>
          <div className="flex flex-wrap gap-4">
            {TAGS.map((tag: Tag) => (
              <label key={tag} className="inline-flex items-center gap-2">
                <input type="checkbox" value={tag} {...register('tags')} />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Steps to reproduce */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label">Steps to reproduce</label>
            <button
              type="button"
              onClick={() => append({ value: '', id: fields.length })}
              className="text-sm text-primary hover:underline"
            >
              + Add step
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((f, idx) => (
              <div key={f.id}>
                <div className="flex items-center gap-2">
                  <input
                    className="input flex-1"
                    placeholder={`Step ${idx + 1}`}
                    {...register(`steps.${idx}.value` as const)}
                  />
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <ErrorText text={errors.steps?.[idx]?.value?.message} />
              </div>
            ))}
          </div>
          <ErrorText text={errors.steps?.message} />
        </div>

        <button type="submit" className="pt-2 flex items-center gap-2 btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

