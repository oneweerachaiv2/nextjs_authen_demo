import Link from 'next/link'
import { getSession } from 'next-auth/react'

export default function Products({ products, error }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {error ? (
        <p className="text-red-600 mb-4">Failed to load products.</p>
      ) : (
        <ul className="space-y-2">
          {products.map(p => (
            <li key={p.id} className="border rounded p-4 shadow">
              {p.name} - ${p.price}
            </li>
          ))}
        </ul>
      )}
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
  let products = []
  let error = false

  try {
    const res = await fetch(`${backendUrl}/products`)
    if (res.ok) {
      products = await res.json()
    } else {
      console.error('Failed to fetch products:', res.status, res.statusText)
      error = true
    }
  } catch (err) {
    console.error('Error connecting to backend:', err)
    error = true
  }

  return {
    props: { products, error }
  }
}
