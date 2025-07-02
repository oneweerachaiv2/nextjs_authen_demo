import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { users } from '../lib/users'

export default function Users({ users }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <ul className="space-y-2">
        {users.map(u => (
          <li key={u.id} className="border rounded p-4 shadow">
            {u.name} - {u.email} ({u.role})
          </li>
        ))}
      </ul>
      <Link className="mt-4 inline-block text-blue-600 underline" href="/">
        Back
      </Link>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  if (session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false
      }
    }
  }
  return {
    props: { users }
  }
}
