import { BellIcon } from '@heroicons/react/24/outline';
import { AvatarUser } from '../ui/AvatarUser.jsx';

export const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-sm)]'>
      <div className='mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6'>
        <div>
          <p className='text-xs uppercase tracking-[0.32em] text-[var(--text-muted)]'>Panel principal</p>
          <h1 className='text-lg font-semibold text-[var(--text-h)]'>Bienvenido a La Brasa 33</h1>
        </div>

        <div className='flex items-center gap-3'>
          <button className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text)] transition hover:bg-[var(--bg-hover)]'>
            <BellIcon className='h-5 w-5' />
          </button>
          <AvatarUser />
        </div>
      </div>
    </nav>
  );
};
