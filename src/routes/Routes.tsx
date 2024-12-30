import { createBrowserRouter, Navigate } from 'react-router-dom';
import Main from '../layout/Main/Main';
import Login from '../pages/auth/Login';
import PrivateRoute from '../private/PrivateRoute';
import VendorDashboard from '../pages/dashboard/vendor/VendorDashboard';
import { UserRole } from '../utils/UserRole';
import AdminAllReviews from '../pages/dashboard/admin/AdminAllReviews';
import VendorAllShop from '../pages/dashboard/vendor/VendorAllShop';
import VendorAddShop from '../pages/dashboard/vendor/VendorAddShop';
import VendorEditShop from '../pages/dashboard/vendor/VendorEditShop';
import VendorAllProducts from '../pages/dashboard/vendor/VendorAllProducts';
import VendorAddProduct from '../pages/dashboard/vendor/VendorAddProduct';
import VendorEditProduct from '../pages/dashboard/vendor/VendorEditProduct';
import VendorOrderHistory from '../pages/dashboard/vendor/VendorOrderHistory';
import VendorReviews from '../pages/dashboard/vendor/VendorReviews';
import AdminAllOrders from '../pages/dashboard/admin/AdminAllOrders';
import AdminAllCoupon from '../pages/dashboard/admin/AdminAllCoupon';
import AdminEditCoupon from '../pages/dashboard/admin/AdminEditCoupon';
import AdminAddCoupon from '../pages/dashboard/admin/AdminAddCoupon';
import AdminAllProducts from '../pages/dashboard/admin/AdminAllProducts';
import AdminEditCategory from '../pages/dashboard/admin/AdminEditCategory';
import AdminAddCategory from '../pages/dashboard/admin/AdminAddCategory';
import AdminAllCategories from '../pages/dashboard/admin/AdminAllCategories';
import AdminAllShop from '../pages/dashboard/admin/AdminAllShop';
import AdminAllUsers from '../pages/dashboard/admin/AdminAllUsers';
import AdminDashboard from '../pages/dashboard/admin/AdminDashboard';
import Dashboard from '../layout/dashboard/Dashboard';
import Profile from '../pages/dashboard/common/Profile';
import BecomeVendor from '../pages/BecomeVendor';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/become-vendor',
        element: <BecomeVendor />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <Navigate to={'/'} replace />,
    children: [
      {
        path: 'my-profile',
        element: (
          <PrivateRoute
            roles={[
              UserRole.admin,
              UserRole.super_admin,
              UserRole.vendor,
              UserRole.customer,
            ]}
          >
            <Profile />
          </PrivateRoute>
        ),
      },
      // Admin dashboard route
      {
        path: 'admin-dashboard',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-users',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-shops',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllShop />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-categories',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllCategories />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/add-category',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAddCategory />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/edit-category/:id',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminEditCategory />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-products',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/add-coupon',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            {' '}
            <AdminAddCoupon />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/edit-coupon/:id',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminEditCoupon />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-coupons',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllCoupon />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-orders',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/all-reviews',
        element: (
          <PrivateRoute roles={[UserRole.admin, UserRole.super_admin]}>
            <AdminAllReviews />
          </PrivateRoute>
        ),
      },

      // vendor dashboard
      {
        path: 'vendor-dashboard',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/all-shop',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorAllShop />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/add-shop',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            {' '}
            <VendorAddShop />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/edit-shop/:id',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorEditShop />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/all-products',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorAllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/add-product',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorAddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/edit-product/:id',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorEditProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/order-history',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorOrderHistory />
          </PrivateRoute>
        ),
      },
      {
        path: 'vendor/review-management',
        element: (
          <PrivateRoute roles={[UserRole.vendor]}>
            <VendorReviews />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
