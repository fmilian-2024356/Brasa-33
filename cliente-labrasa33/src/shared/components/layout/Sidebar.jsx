import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../features/auth/store/authStore.js';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  CalendarIcon,
  DocumentChartBarIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Restaurantes', to: '/dashboard/restaurants', icon: BuildingStorefrontIcon },
  { label: 'Pedidos', to: '/dashboard/orders', icon: ClipboardDocumentListIcon },
  { label: 'Menú', to: '/dashboard/menu', icon: Bars3Icon },
  { label: 'Reservas', to: '/dashboard/reservations', icon: CalendarIcon },
  { label: 'Reportes', to: '/dashboard/reports', icon: DocumentChartBarIcon },
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
    <aside className="w-[var(--sidebar-w)] min-h-screen bg-[var(--bg)] border-r border-[var(--border)] px-5 py-6 flex flex-col justify-between">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-white font-bold shadow-sm">
            33
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400">
              Admin
            </p>
            <h2 className="text-lg font-semibold text-white">
              La 33
            </h2>
          </div>
        </div>

        {/* NAV */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 border ${
                    isActive
                      ? 'bg-[rgba(255,255,255,0.06)] text-white border-[rgba(255,255,255,0.12)]'
                      : 'text-gray-300 border-transparent hover:bg-[rgba(255,255,255,0.04)] hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5 flex-shrink-0 opacity-80 group-hover:opacity-100 transition" />
                <span>{item.label}</span>

                {/* Active indicator (más sutil, no azul) */}
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white opacity-0 group-[.active]:opacity-100"></span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[var(--bg-card)] px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
      >
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
        Cerrar sesión
      </button>
    </aside>
  );
};