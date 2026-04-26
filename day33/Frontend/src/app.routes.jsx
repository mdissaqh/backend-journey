import {createBrowserRouter} from 'react-router';
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';
import SellerProtectedRoute from './features/auth/components/SellerProtectedRoute';
import CreateProduct from './features/products/pages/CreateProduct';
import SellerProducts from './features/products/pages/SellerProducts';
import BuyerProducts from './features/products/pages/BuyerProducts';
import BuyerProductDetails from './features/products/pages/BuyerProductDetails';

export const router=createBrowserRouter([
    {
        path: "/",
        element: <BuyerProducts />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/seller/products",
        element: <SellerProtectedRoute><SellerProducts /></SellerProtectedRoute>
    },
    {
        path: "/seller/products/create",
        element: <SellerProtectedRoute><CreateProduct /></SellerProtectedRoute>
    },
    {
        path: "/product/:productId",
        element: <BuyerProductDetails />
    }
]);