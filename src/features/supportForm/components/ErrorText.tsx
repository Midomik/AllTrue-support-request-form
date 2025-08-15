export default function ErrorText({ text }: { text?: string }) {
  if (!text) return null
  return <p className="mt-1 text-sm text-red-600">{text}</p>
}
