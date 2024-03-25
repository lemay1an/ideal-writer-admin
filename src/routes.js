import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import BlogsPage from './pages/BlogsPage';
import PricingPage from './pages/PricingPage';
import QueriesPage from './pages/QueriesPage';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        {
          path: 'app',
          element: <DashboardAppPage />,
        },
        { path: 'orders', element: <ProductsPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'settings', element: <BlogPage /> },
        { path: 'blogs', element: <BlogsPage /> },
        { path: 'pricing', element: <PricingPage /> },
        { path: 'queries', element: <QueriesPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  return routes;
}
