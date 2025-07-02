import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Portal Home</h1>
      {session ? (
        <>
          <p className="mb-2">
            Signed in as {session.user.email} ({session.user.role})
          </p>
          <button
            className="mb-4 rounded bg-blue-600 px-3 py-1 text-white"
            onClick={() => signOut()}
          >
            Sign out
          </button>
          <ul className="space-y-2">
            <li>
              <Link className="text-blue-600 underline" href="/products">
                Products
              </Link>
            </li>
            <li>
              <Link className="text-blue-600 underline" href="/users">
                Users
              </Link>
            </li>
            <li>
              <Link className="text-blue-600 underline" href="/public">
                Public Page
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <p className="mb-4">You are not signed in</p>
          <Link className="text-blue-600 underline" href="/login">
            Sign in
          </Link>
        </>
      )}
    </div>
  )
}
