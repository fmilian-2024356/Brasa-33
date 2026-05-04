import { useEffect, useMemo, useState } from 'react';
import { useUserManagementStore } from '../store/useUserManagementStore.js';
import { useAuthStore } from '../../auth/store/authStore.js';
import { Spinner } from '../../auth/components/Spinner.jsx';
import { CreateUserModal } from './CreateUserModal.jsx';
import { showError, showSuccess } from '../../../shared/utils/toast.js';

const PAGE_SIZE = 8;

export const Users = () => {
  const { users, loading, error, getAllUsers } =
    useUserManagementStore();

  const registerUser = useAuthStore((state) => state.register);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [page, setPage] = useState(1);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  const filteredUsers = useMemo(() => {
    const s = search.toLowerCase().trim();

    return users.filter((u) => {
      const name = `${u.name} ${u.surname}`.toLowerCase();
      const username = u.username?.toLowerCase();
      const role = u.role;

      const matchSearch =
        !s || name.includes(s) || username.includes(s);

      const matchRole =
        roleFilter === 'ALL' || role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / PAGE_SIZE)
  );

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, page]);

  const handleCreate = async (formData) => {
    const res = await registerUser(formData);

    if (res.success) {
      showSuccess('Usuario creado');
      await getAllUsers();
      return true;
    }

    showError(res.error);
    return false;
  };

  if (loading && users.length === 0) return <Spinner />;

  return (
    <div className='p-6'>

      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-[var(--text-h)]'>
            Usuarios
          </h1>
          <p className='text-[var(--text-muted)] text-sm'>
            Gestión de usuarios del sistema
          </p>
        </div>

        <button
          onClick={() => setOpenCreateModal(true)}
          className='px-4 py-2 rounded-xl text-white'
          style={{
            background:
              'linear-gradient(90deg, var(--main-blue), #1956a3)',
          }}
        >
          + Agregar Usuario
        </button>
      </div>

      {/* FILTERS */}
      <div
        className='rounded-xl border p-4 mb-4'
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border)',
        }}
      >
        <div className='grid md:grid-cols-3 gap-3'>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Buscar...'
            className='px-3 py-2 rounded-lg'
            style={{
              background: '#333',
              color: '#fff',
            }}
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className='px-3 py-2 rounded-lg'
            style={{ background: '#333', color: '#fff' }}
          >
            <option value='ALL'>Todos</option>
            <option value='ADMIN_ROLE'>Admin</option>
            <option value='USER_ROLE'>User</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div
        className='rounded-xl border overflow-hidden'
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border)',
        }}
      >
        <table className='w-full text-sm'>
          <thead style={{ background: '#111' }}>
            <tr className='text-left text-[var(--text-muted)]'>
              <th className='p-3'>Nombre</th>
              <th className='p-3'>Username</th>
              <th className='p-3'>Rol</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className='text-center p-6 text-[var(--text-muted)]'
                >
                  No hay usuarios
                </td>
              </tr>
            ) : (
              paginatedUsers.map((u) => (
                <tr
                  key={u.id}
                  className='border-t hover:bg-white/5'
                  style={{ borderColor: 'var(--border)' }}
                >
                  <td className='p-3 text-[var(--text-h)]'>
                    {u.name} {u.surname}
                  </td>
                  <td className='p-3 text-[var(--text-muted)]'>
                    @{u.username}
                  </td>
                  <td className='p-3'>
                    <span
                      className='px-2 py-1 rounded-full text-xs'
                      style={{
                        background:
                          u.role === 'ADMIN_ROLE'
                            ? 'rgba(59,130,246,0.15)'
                            : 'rgba(255,255,255,0.05)',
                        color:
                          u.role === 'ADMIN_ROLE'
                            ? '#60a5fa'
                            : '#A6A6A6',
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <CreateUserModal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onCreate={handleCreate}
        loading={loading}
        error={error}
      />
    </div>
  );
};