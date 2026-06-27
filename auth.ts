import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// ponytail: hardcoded user — replace with a real DB lookup when you have one
const USERS = [{ id: "1", name: "Admin", email: "admin@example.com", password: "password" }]

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: { label: "Email" }, password: { label: "Password", type: "password" } },
      authorize({ email, password }) {
        const user = USERS.find((u) => u.email === email && u.password === password)
        return user ?? null
      },
    }),
  ],
  pages: { signIn: "/login" },
})
