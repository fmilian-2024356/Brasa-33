import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export const LoginForm = ({ onForgot }) => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await login(data);
    if (res.success) {
      navigate('/dashboard');
      toast.success('¡Bienvenido a La 33!', { duration: 2000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label htmlFor='emailOrUsername' className='block text-sm font-medium text-[var(--text-h)]'>
            Correo electrónico
          </label>
          <div className='relative'>
            <EnvelopeIcon className='pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]' />
            <input
              type='text'
              id='emailOrUsername'
              placeholder='ejemplo@correo.com'
              className='w-full rounded-3xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-[var(--text-h)] outline-none transition focus:border-[var(--accent)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--accent)]/20'
              {...register('emailOrUsername', {
                required: 'El email o username es obligatorio',
              })}
            />
          </div>
          {errors.emailOrUsername && (
            <p className='text-xs text-rose-300'>{errors.emailOrUsername.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <label htmlFor='password' className='block text-sm font-medium text-[var(--text-h)]'>
            Contraseña
          </label>
          <div className='relative'>
            <LockClosedIcon className='pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]' />
            <input
              type='password'
              id='password'
              placeholder='********'
              className='w-full rounded-3xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-[var(--text-h)] outline-none transition focus:border-[var(--accent)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--accent)]/20'
              {...register('password', {
                required: 'La contraseña es obligatoria',
              })}
            />
          </div>
          {errors.password && <p className='text-xs text-rose-300'>{errors.password.message}</p>}
        </div>
      </div>

      {error && <p className='text-center text-sm text-rose-300'>{error}</p>}

      <button
        type='submit'
        disabled={loading}
        className='w-full rounded-3xl bg-white/15 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-h)] shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition duration-200 hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60'
      >
        Iniciar sesión
      </button>

      <div className='text-center text-sm text-[var(--text-muted)]'>
        <button type='button' onClick={onForgot} className='underline underline-offset-4 decoration-[var(--accent)] decoration-1 text-[var(--text-h)]'>
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </form>
  );
};
