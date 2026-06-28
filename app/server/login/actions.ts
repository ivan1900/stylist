'use server';
import { signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export async function login(_prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { error: 'Email and password are required' };
    }

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }

    // NextAuth errors
    const errorType = error?.type ?? error?.code;
    if (errorType === 'CredentialsSignin') {
      return { error: 'Invalid email or password' };
    }
    return { error: error.message || 'An error occurred during login' };
  }
}

export async function logout() {
  await signOut({ redirectTo: '/login' });
}
