import { Button } from '@heroui/react';
import { logout } from '@/app/server/login/actions';

export default function AppBar() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
      }}>
      <div style={{ fontWeight: 'bold' }}>Stylist</div>
      <form action={logout}>
        <Button
          type='submit'
          variant='ghost'
          className='text-indigo-600 dark:text-pink-400 font-medium'>
          Sign out
        </Button>
      </form>
    </header>
  );
}
