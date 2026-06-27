"use server"
import { signIn, signOut } from "@/auth"

export async function login(formData: FormData) {
  await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirectTo: "/dashboard" })
}

export async function logout() {
  await signOut({ redirectTo: "/login" })
}
