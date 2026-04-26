import {createBrowserRouter} from 'react-router';
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';
import SellerProtectedRoute from './features/auth/components/SellerProtectedRoute';
import CreateProduct from './features/products/pages/CreateProduct';

export const router=createBrowserRouter([
    {
        path: "/",
        element: <h1>Home Page</h1>
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
        element: <SellerProtectedRoute><h1>Seller Dashboard</h1></SellerProtectedRoute>
    },
    {
        path: "/seller/products/create",
        element: <SellerProtectedRoute><CreateProduct /></SellerProtectedRoute>
    }
]);