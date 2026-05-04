import { useEffect, useState } from 'react';
import { useRestaurantsStore } from '../store/useRestaurantStore.js';
import { Spinner } from '../../auth/components/Spinner.jsx';
import { RestaurantModal } from './RestaurantModal.jsx';
import { useUIStore } from '../../auth/store/uiStore.js';
import { showError } from '../../../shared/utils/toast.js';

export const Restaurants = () => {
  const { restaurants, loading, error, getRestaurants, deleteRestaurant } =
    useRestaurantsStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const { openConfirm } = useUIStore();

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6 min-h-screen" style={{ background: '#0D0D0D' }}>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#F2F2F2]">
            Restaurantes
          </h1>
          <p className="text-[#A6A6A6] text-sm">
            Administra los restaurantes
          </p>
        </div>

        <button
          className="px-4 py-2 rounded-lg font-semibold"
          style={{
            background: '#F2F2F2',
            color: '#0D0D0D',
          }}
          onClick={() => {
            setSelectedRestaurant(null);
            setOpenModal(true);
          }}
        >
          + Agregar Restaurante
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl p-5 border"
            style={{
              background: '#1A1A1A',
              borderColor: '#333333',
            }}
          >
            <h2 className="text-xl font-bold text-[#F2F2F2]">{r.name}</h2>

            <p className="text-[#A6A6A6] text-sm">{r.address}</p>
            <p className="text-[#A6A6A6] text-sm">{r.phone}</p>

            <div className="flex gap-3 mt-5">
              <button
                className="flex-1 py-2 rounded-lg"
                style={{ background: '#333333', color: '#F2F2F2' }}
                onClick={() => {
                  setSelectedRestaurant(r);
                  setOpenModal(true);
                }}
              >
                Editar
              </button>

              <button
                className="flex-1 py-2 rounded-lg"
                style={{ background: '#7f1d1d', color: '#F2F2F2' }}
                onClick={() =>
                  openConfirm({
                    title: 'Eliminar restaurante',
                    message: `¿Eliminar ${r.name}?`,
                    onConfirm: () => deleteRestaurant(r.id),
                  })
                }
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <RestaurantModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedRestaurant(null);
        }}
        restaurant={selectedRestaurant}
      />
    </div>
  );
};