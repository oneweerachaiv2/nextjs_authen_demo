import Link from 'next/link'

export default function PublicPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Public Page</h1>
      <p className="mb-4">This page is accessible without signing in.</p>
      <Link className="text-blue-600 underline" href="/">
        Back to Home
      </Link>
    </div>
  )
}
