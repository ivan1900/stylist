import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { timingSafeEqual } from "crypto"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: { label: "Email" }, password: { label: "Password", type: "password" } },
      authorize({ email, password }) {
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD
        const adminName = process.env.ADMIN_NAME ?? "Admin"

        if (!adminEmail || !adminPassword || !email || !password) return null
        if (email !== adminEmail) return null

        const bufInput = Buffer.from(String(password))
        const bufStored = Buffer.from(adminPassword)
        if (bufInput.length !== bufStored.length) return null
        if (!timingSafeEqual(bufInput, bufStored)) return null

        return { id: "1", name: adminName, email: adminEmail }
      },
    }),
  ],
  pages: { signIn: "/login" },
})

// Required environment variables (add to .env):
// ADMIN_EMAIL=admin@example.com
// ADMIN_PASSWORD=your-secure-password
// ADMIN_NAME=Admin   (optional, defaults to "Admin")
