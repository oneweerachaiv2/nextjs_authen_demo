import { getSession } from 'next-auth/react'
import { products } from '../lib/products'

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
  return {
    props: { products }
  }
}
