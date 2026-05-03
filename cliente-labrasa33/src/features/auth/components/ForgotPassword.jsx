import { useForm } from 'react-hook-form';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export const ForgotPassword = ({ onSwitch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    // Aquí puedes agregar la lógica real de recuperación de contraseña.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='space-y-2'>
        <label htmlFor='email' className='block text-sm font-medium text-[var(--text-h)]'>
          Correo electrónico
        </label>
        <div className='relative'>
          <EnvelopeIcon className='pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]' />
          <input
            type='text'
            id='email'
            placeholder='ejemplo@correo.com'
            className='w-full rounded-3xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-[var(--text-h)] outline-none transition focus:border-[var(--accent)] focus:bg-white/10 focus:ring-2 focus:ring-[var(--accent)]/20'
            {...register('email', {
              required: 'El email es obligatorio',
            })}
          />
        </div>
        {errors.email && <p className='text-xs text-rose-300'>{errors.email.message}</p>}
      </div>

      <button
        type='submit'
        className='w-full rounded-3xl bg-white/15 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-h)] shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition duration-200 hover:bg-white/25'
      >
        Recuperar contraseña
      </button>

      <div className='text-center text-sm text-[var(--text-muted)]'>
        ¿Recordaste tu contraseña?{' '}
        <button type='button' onClick={onSwitch} className='underline underline-offset-4 decoration-[var(--accent)] decoration-1 text-[var(--text-h)]'>
          Iniciar sesión
        </button>
      </div>
    </form>
  );
};
