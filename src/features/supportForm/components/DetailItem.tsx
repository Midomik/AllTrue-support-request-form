import { type ReactNode } from 'react'

type DetailItemProps = {
  label: string
  value: ReactNode
}

export default function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="space-y-1">
      <span className="detail-label">{label}</span>
      <p className="text-base">{value}</p>
    </div>
  )
}
