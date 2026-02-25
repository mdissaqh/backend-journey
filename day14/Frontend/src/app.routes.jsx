import {createBrowserRouter} from 'react-router'
import Register from './features/auth/pages/Register'
import Login1 from './features/auth/pages/Login1'
import Feed from './features/posts/pages/Feed'





export const router=createBrowserRouter([
    {
        path:'/login',
        element:<Login1 />
    },
    {
        path:'/register',
        element:<Register />
    },
    {
        path:'/',
        element:<Feed/>
    }
])