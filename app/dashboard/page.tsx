import { auth } from '@/auth';
import AppBar from '@/app/components/AppBar';
import ModelPhotoUpload from '@/app/components/ModelPhotoUpload';

export default async function DashboardPage() {
  const session = await auth();
  return (
    <>
      <AppBar />
      <main className="max-w-2xl mx-auto my-24 px-4 font-sans space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-default-500">
            Bienvenido, {session?.user?.name ?? 'stranger'}!
          </p>
        </div>
        <ModelPhotoUpload />
      </main>
    </>
  );
}
