import Link from 'next/link'

export default function Unauthorized() {
  return (
    <div className="p-8 text-center">
      <h1 className="mb-4 text-2xl font-bold">Access Denied</h1>
      <p className="mb-4">You do not have permission to view this page.</p>
      <Link className="text-blue-600 underline" href="/">
        Go back home
      </Link>
    </div>
  )
}
