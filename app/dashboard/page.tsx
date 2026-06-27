import { auth } from '@/auth';
import { logout } from '@/app/server/login/actions';

export default async function DashboardPage() {
  const session = await auth();
  return (
    <main
      style={{ maxWidth: 360, margin: '100px auto', fontFamily: 'sans-serif' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user?.name ?? 'stranger'}!</p>
      <form action={logout}>
        <button type='submit'>Sign out</button>
      </form>
    </main>
  );
}
