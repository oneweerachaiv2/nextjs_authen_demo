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
        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        )
        if (user) {
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
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
  }
})
