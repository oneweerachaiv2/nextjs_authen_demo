import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div>
      <h1>Portal Home</h1>
      {session ? (
        <>
          <p>Signed in as {session.user.email} ({session.user.role})</p>
          <button onClick={() => signOut()}>Sign out</button>
          <ul>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/users">Users</Link></li>
          </ul>
        </>
      ) : (
        <>
          <p>You are not signed in</p>
          <Link href="/login">Sign in</Link>
        </>
      )}
    </div>
  )
}
