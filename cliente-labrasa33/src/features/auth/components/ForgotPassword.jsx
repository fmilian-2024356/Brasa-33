import { useForm } from 'react-hook-form';

export const ForgotPassword = ({ onSwitch }) => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className='space-y-5'>
      <div>
        <label htmlFor='email' className='block text-sm font-medium mb-1.5' style={{ color: '#A6A6A6' }}>
          Correo electrónico
        </label>
        <input
          type='text'
          id='email'
          placeholder='ejemplo@correo.com'
          className='w-full px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-2 transition-all'
          style={{ backgroundColor: '#333333', borderColor: '#333333', color: '#F2F2F2', border: '1px solid #333333', outline: 'none' }}
          {...register('email', {
            required: 'El email es obligatorio',
          })}
        />
        {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
      </div>
      <button
        type='submit'
        className='w-full font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm'
        style={{ backgroundColor: '#A6A6A6', color: '#0D0D0D' }}
      >
        Recuperar Contraseña
      </button>
      <p className='text-center text-sm'>
        <span style={{ color: '#A6A6A6' }}>¿Recordaste tu contraseña?{' '}</span>
        <button
          type='button'
          onClick={onSwitch}
          className='hover:underline hover:cursor-pointer'
          style={{ color: '#A6A6A6' }}
        >
          Iniciar Sesión
        </button>
      </p>
    </form>
  );
};
