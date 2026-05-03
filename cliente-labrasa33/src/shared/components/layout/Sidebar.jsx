import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../features/auth/store/authStore.js';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Panel principal', to: '/dashboard', icon: HomeIcon },
  { label: 'Pedidos', to: '/dashboard/orders', icon: ClipboardDocumentListIcon },
  { label: 'Restaurantes', to: '/dashboard/restaurants', icon: BuildingStorefrontIcon },
  { label: 'Usuarios', to: '/dashboard/users', icon: UsersIcon },
];

export const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <aside className='w-[var(--sidebar-w)] min-h-screen bg-[var(--sidebar-bg)] border-r border-[var(--border)] px-5 py-6 flex flex-col justify-between'>
      <div>
        <div className='mb-10 flex items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-3xl bg-[var(--accent)] text-[#0d1f1e] font-bold'>
            La
          </div>
          <div>
            <p className='text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]'>Admin</p>
            <h2 className='text-lg font-semibold text-[var(--text-h)]'>La Brasa 33</h2>
          </div>
        </div>

        <nav className='space-y-1'>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[rgba(78,205,196,0.12)] text-[var(--accent)]'
                      : 'text-[var(--text)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-h)]'
                  }`
                }
              >
                <Icon className='h-5 w-5 flex-shrink-0' />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className='mt-8 flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--bg-hover)]'
      >
        <ArrowLeftOnRectangleIcon className='h-5 w-5' />
        Cerrar sesión
      </button>
    </aside>
  );
};
