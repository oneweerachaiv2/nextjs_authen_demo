import Link from 'next/link'
import { getSession } from 'next-auth/react'

export default function Products({ products }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="space-y-2">
        {products.map(p => (
          <li key={p.id} className="border rounded p-4 shadow">
            {p.name} - ${p.price}
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

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080'
  const res = await fetch(`${backendUrl}/products`)
  const products = await res.json()

  return {
    props: { products }
  }
}
