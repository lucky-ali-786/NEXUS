import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Sign from '../pages/Sign.jsx'
import Login from '../pages/Login.jsx'
import Editposts from '../pages/Editposts.jsx'
import Allposts from '../pages/Allposts.jsx'
import Addposts from '../pages/Addposts.jsx'
import Posts from '../pages/Posts.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import GoogleLogin from './components/Google.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google';
import Trendingposts from '../pages/Trendingposts.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import VerifyOtp from './components/VerifyOtp.jsx'
const Googlewrapper=()=>{
  return (<GoogleOAuthProvider clientId="398861674382-2lpmnpq7keapc96ud4qcnjrt9rls1taa.apps.googleusercontent.com">
    <GoogleLogin></GoogleLogin>
  </GoogleOAuthProvider>
)}
const router=createBrowserRouter([
         {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login/>
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Sign />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Allposts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Addposts />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Editposts />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:_id",
            element: <Posts />,
        },
        {
            path:"/googlelogin",
            element:<Googlewrapper/>
        },
        {
            path:'/trendingposts',
            element: (
                <AuthLayout authentication>
                    {" "}
                   <Trendingposts/>
                </AuthLayout>
            ),
        },
        {
            path:'/dashboard',
            element:(
                <AuthLayout authentication>
                    {" "}
                    <Dashboard/>
                </AuthLayout>
            )
        },
        {
            path:"/verify-otp",
            element:(
                <AuthLayout authentication={false}>
                    <VerifyOtp/>
                </AuthLayout>
            )
        }
    ],
}
      ])
createRoot(document.getElementById('root')).render(
 <Provider store={store}>
   <RouterProvider router={router}/>
 </Provider>  
)
