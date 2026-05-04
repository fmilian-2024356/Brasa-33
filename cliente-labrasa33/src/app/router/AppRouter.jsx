import { Routes, Route } from 'react-router-dom';
import { AuthPage } from '../../features/auth/pages/AuthPage.jsx';
import { ProtecterRoute } from './ProtecterRoute.jsx';
import { DashboardPage } from '../layouts/DashboardPage.jsx';
import { RoleGuard } from './RoleGuard.jsx';
import { Restaurants } from '../../features/restaurants/components/Restaurants.jsx';
import { Orders } from '../../features/orders/components/Orders.jsx';
import { Users } from '../../features/users/components/Users.jsx';
import { VerifyEmailPage } from '../../features/auth/pages/VerifyEmailPage.jsx';
export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthPage />} />
      <Route path='/verify-email' element={<VerifyEmailPage />} />
        <Route
        path='/dashboard/*'
        element={
          <ProtecterRoute>
            <RoleGuard allowedRoles={['ADMIN_ROLE']}>
              <DashboardPage />
            </RoleGuard>
          </ProtecterRoute>
        }
      >
        <Route index element={<Restaurants />} />
        <Route path='restaurants' element={<Restaurants />} />
        <Route path='orders' element={<Orders />} />
        <Route path='users' element={<Users />} />
      </Route>
    </Routes>
  );
};
