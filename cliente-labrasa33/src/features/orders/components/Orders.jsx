import { useEffect, useState } from 'react';
import { useOrdersStore } from '../store/useOrdersStore.js';
import { useAuthStore } from '../../auth/store/authStore.js';
import { Spinner } from '../../auth/components/Spinner.jsx';
import { OrderModal } from './OrderModal.jsx';
import { useUIStore } from '../../auth/store/uiStore.js';
import { showError } from '../../../shared/utils/toast.js';

export const Orders = () => {
  const user = useAuthStore((state) => state.user);

  const { orders, loading, error, getOrders, deleteOrder } =
    useOrdersStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { openConfirm } = useUIStore();

  useEffect(() => {
    if (user?.role === 'ADMIN_ROLE') getOrders();
  }, [getOrders, user]);

  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  if (user?.role !== 'ADMIN_ROLE') {
    return (
      <div className="p-6 bg-[#111] text-white rounded-xl text-center border border-[#333]">
        Acceso denegado
      </div>
    );
  }

  if (loading) return <Spinner />;

  return (
    <div className="p-6 space-y-6 bg-[#0D0D0D] min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Pedidos
          </h1>
          <p className="text-gray-400 text-sm">
            Gestión de órdenes
          </p>
        </div>

        <button
          className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:scale-105 transition"
          onClick={() => {
            setSelectedOrder(null);
            setOpenModal(true);
          }}
        >
          + Nuevo pedido
        </button>

      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {orders.length === 0 ? (
          <div className="col-span-full text-center text-gray-400">
            No hay pedidos
          </div>
        ) : (
          orders.map((o) => (
            <div
              key={o.id}
              className="bg-[#1A1A1A] border border-[#333] rounded-xl p-5"
            >

              <h2 className="text-white font-bold">
                Pedido #{o.id}
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Estado: {o.status}
              </p>

              <div className="mt-3 text-white font-semibold">
                Total: ${o.total}
              </div>

              <div className="flex gap-2 mt-4">

                <button
                  className="flex-1 bg-white text-black py-2 rounded-lg font-semibold"
                  onClick={() => {
                    setSelectedOrder(o);
                    setOpenModal(true);
                  }}
                >
                  Ver
                </button>

                <button
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg"
                  onClick={() =>
                    openConfirm({
                      title: 'Eliminar pedido',
                      message: `¿Eliminar pedido #${o.id}?`,
                      onConfirm: () => deleteOrder(o.id),
                    })
                  }
                >
                  Eliminar
                </button>

              </div>

            </div>
          ))
        )}

      </div>

      <OrderModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />

    </div>
  );
};