import { login } from '@/app/server/login/actions';

export default function LoginPage() {
  return (
    <main
      style={{ maxWidth: 360, margin: '100px auto', fontFamily: 'sans-serif' }}>
      <h1>Sign in</h1>
      <form
        action={login}
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          name='email'
          type='email'
          placeholder='Email'
          required
          defaultValue='admin@example.com'
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
        />
        <button type='submit'>Sign in</button>
      </form>
    </main>
  );
}
