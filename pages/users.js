import { getSession } from 'next-auth/react'
import { users } from '../lib/users'

export default function Users({ users }) {
  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} - {u.email} ({u.role})</li>
        ))}
      </ul>
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
