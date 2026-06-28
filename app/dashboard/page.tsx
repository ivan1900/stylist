import { auth } from '@/auth';
import AppBar from '@/app/components/AppBar';

export default async function DashboardPage() {
  const session = await auth();
  return (
    <>
      <AppBar />
      <main className="max-w-md mx-auto my-24 font-sans">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome, {session?.user?.name ?? 'stranger'}!</p>
      </main>
    </>
  );
}
