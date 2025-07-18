import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { users } from '../../../lib/users'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        )
        
        if (user) {
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes
  },
  jwt: {
    maxAge: 30 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
})
