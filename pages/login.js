import { getCsrfToken, signIn } from 'next-auth/react'
import { useState } from 'react'

export default function Login({ csrfToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials')
      } else {
        // Redirect to home page or dashboard
        window.location.href = '/'
      }
    } catch (err) {
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {csrfToken && (
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        )}
        {error && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </div>
        )}
        <div style={{ marginBottom: '15px' }}>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const csrfToken = await getCsrfToken(context)
    return {
      props: {
        csrfToken: csrfToken || null, // Ensure we return null instead of undefined
      }
    }
  } catch (error) {
    console.error('Error getting CSRF token:', error)
    return {
      props: {
        csrfToken: null,
      }
    }
  }
}
