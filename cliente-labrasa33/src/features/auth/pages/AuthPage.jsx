import { useState } from 'react';
import { LoginForm } from '../components/LoginForm.jsx';
import { ForgotPassword } from '../components/ForgotPassword.jsx';

export const AuthPage = () => {
  const [isForgot, setIsForgot] = useState(false);

  return (
    <div className='min-h-screen bg-[#09090d] text-[var(--text)]'>
      <div className='relative min-h-screen overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(78,205,196,0.14),transparent_24%)]' />
        <div className='relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10'>
          <div className='grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
            <div className='rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl'>
              <div className='flex flex-col items-center gap-4 text-center'>
                <div className='flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--accent)] text-[#0d1f1e] text-3xl font-bold'>La</div>
                <h1 className='text-3xl font-semibold text-[var(--text-h)]'>La 33</h1>
                <p className='max-w-md text-sm text-[var(--text-muted)]'>Ingresa tus credenciales para acceder al panel de administración.</p>
              </div>

              <div className='mt-10'>
                {isForgot ? (
                  <ForgotPassword onSwitch={() => setIsForgot(false)} />
                ) : (
                  <LoginForm onForgot={() => setIsForgot(true)} />
                )}
              </div>
            </div>

            <div className='flex items-center justify-center rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_30px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl'>
              <div className='space-y-6 text-center'>
                <p className='text-sm uppercase tracking-[0.35em] text-[var(--text-muted)]'>Bienvenido a</p>
                <h2 className='text-4xl font-semibold text-[var(--text-h)]'>La 33</h2>
                <p className='max-w-xl text-base text-[var(--text)]'>Disfruta de la experiencia culinaria, administra pedidos, restaurantes y usuarios desde un panel elegante y moderno.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
