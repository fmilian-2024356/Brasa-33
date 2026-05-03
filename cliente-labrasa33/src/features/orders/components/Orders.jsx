import { useEffect, useState } from 'react';
import { useFieldsStore } from '../../users/store/adminStore';
import { useAuthStore } from '../../auth/store/authStore.js';
import { Spinner } from '../../auth/components/Spinner.jsx';
import { OrderModal } from './OrderModal.jsx';
import { useUIStore } from '../../auth/store/uiStore.js';
import { useEffect as useToastEffect } from 'react';
import { showError } from '../../../shared/utils/toast.js';

export const Orders = () => {
  const user = useAuthStore((state) => state.user);
  const { fields, loading, error, getFields, deleteField } = useFieldsStore();
  const [openModal, setOpenModal] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const { openConfirm } = useUIStore();

  useEffect(() => {
    if (user?.role === 'ADMIN_ROLE') {
      getFields();
    }
  }, [getFields, user]);

  useToastEffect(() => {
    if (error) showError(error);
  }, [error]);

  if (user?.role !== 'ADMIN_ROLE') {
    return (
      <div className='rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-[var(--text)]'>
        <h2 className='text-2xl font-semibold text-[var(--text-h)]'>Acceso denegado</h2>
        <p className='mt-3 text-sm text-[var(--text-muted)]'>Solo los administradores pueden ver esta sección.</p>
      </div>
    );
  }

  if (loading) return <Spinner />;

  return (
    <div className='space-y-8'>
      <div className='rounded-3xl border border-white/10 bg-white/5 p-8'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='text-3xl font-semibold text-[var(--text-h)]'>Pedidos recientes</h1>
            <p className='mt-1 text-sm text-[var(--text-muted)]'>Aquí puedes revisar pedidos y administrar el panel.</p>
          </div>
          <button
            className='inline-flex items-center justify-center rounded-3xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#0d1f1e] transition hover:bg-[var(--accent-hover)]'
            onClick={() => setOpenModal(true)}
          >
            + Agregar pedido
          </button>
        </div>
      </div>

      <div className='grid gap-6 xl:grid-cols-2'>
        {fields.length === 0 ? (
          <div className='rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-[var(--text-muted)]'>
            No hay pedidos disponibles. Crea uno nuevo para comenzar.
          </div>
        ) : (
          fields.map((field) => (
            <div
              key={field._id}
              className='overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[var(--shadow-sm)]'
            >
              <div className='flex h-44 items-center justify-center bg-[var(--bg-hover)]'>
                <img src={field.photo} alt={field.fieldName} className='h-full w-full object-cover' />
              </div>
              <div className='p-6'>
                <h2 className='text-2xl font-semibold text-[var(--text-h)]'>{field.fieldName}</h2>
                <p className='mt-2 text-sm text-[var(--text-muted)]'>{field.description || 'Descripción no disponible.'}</p>
                <div className='mt-4 flex flex-wrap gap-3'>
                  <span className='rounded-2xl bg-white/10 px-3 py-2 text-xs text-[var(--text-h)]'>Capacidad: {field.capacity.replace('_', ' ')}</span>
                  <span className='rounded-2xl bg-white/10 px-3 py-2 text-xs text-[var(--text-h)]'>Q{field.pricePerHour}/hora</span>
                </div>
                <div className='mt-6 flex flex-col gap-3 sm:flex-row'>
                  <button
                    className='flex-1 rounded-3xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[#0d1f1e] transition hover:bg-[var(--accent-hover)]'
                    onClick={() => {
                      setSelectedField(field);
                      setOpenModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className='flex-1 rounded-3xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600'
                    onClick={() =>
                      openConfirm({
                        title: 'Eliminar pedido',
                        message: `¿Deseas eliminar ${field.fieldName}?`,
                        onConfirm: () => deleteField(field._id),
                      })
                    }
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <OrderModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedField(null);
        }}
        field={selectedField}
      />
    </div>
  );
};
