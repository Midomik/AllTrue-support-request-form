import { Navigate, Link } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import DetailItem from '../components/DetailItem'

// ConfirmationPage – displays submitted support form data in a read-only card

export default function ConfirmationPage() {
  const data = useAppSelector((s) => s.supportForm)

  // Guard: if user navigates directly or data is empty, send back to form
  if (!data || data.steps.length === 0) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-4">Support Request Submitted</h1>
        <div className="space-y-4">

          {/* Basic details */}
          <DetailItem label="Full name" value={data.fullName} />
          <DetailItem label="Email" value={data.email} />
          <DetailItem label="Issue type" value={data.issueType} />

          {/* Tags */}
          <div>
            <span className="detail-label">Tags</span>
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

          {/* Steps to reproduce */}
          <div>
            <span className="detail-label">Steps to reproduce</span>
            <ol className="list-decimal ml-6 space-y-1">
              {data.steps.map((s, idx) => (
                <li key={idx}>{s.value}</li>
              ))}
            </ol>
          </div>

          <div className="mt-6">
            <Link to="/" className="btn">Back</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
