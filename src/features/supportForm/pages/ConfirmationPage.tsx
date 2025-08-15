import { useAppSelector } from '../../../app/hooks'

export default function ConfirmationPage() {
  const data = useAppSelector((s) => s.supportForm)

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-4">Support Request Submitted</h1>
        <div className="space-y-4">
          <div>
            <span className="label mb-1">Full name</span>
            <p>{data.fullName}</p>
          </div>
          <div>
            <span className="label mb-1">Email</span>
            <p>{data.email}</p>
          </div>
          <div>
            <span className="label mb-1">Issue type</span>
            <p>{data.issueType}</p>
          </div>
          <div>
            <span className="label mb-1">Tags</span>
            {data.tags?.length ? (
              <ul className="list-disc ml-6">
                {data.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : (
              <p className="">No tags</p>
            )}
          </div>
          <div>
            <span className="label mb-1">Steps to reproduce</span>
            <ol className="list-decimal ml-6 space-y-1">
              {data.steps.map((s) => (
                <li key={s.id}>{s.value}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
