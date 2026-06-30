import { Button } from '@heroui/react';
import { logout } from '@/app/server/login/actions';

export default function AppBar() {
  return (
    <header className='flex justify-between items-center px-4 py-4 bg-white border-b border-gray-200'>
      <div className='font-bold text-slate-800'>Stylist</div>
      <form action={logout}>
        <Button
          type='submit'
          variant='ghost'
          className='text-slate-600 font-medium'>
          Sign out
        </Button>
      </form>
    </header>
  );
}
