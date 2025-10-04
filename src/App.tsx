import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Notifications } from '@mantine/notifications'

import { ShoppingCartProvider } from './context/ShoppingCartContext.tsx'

import { DashboardLayout } from './components/layout/DashboardLayout/DashboardLayout.tsx'
import { DefaultLayout } from './components/layout/DefaultLayout/DefaultLayout.tsx'

import { ProductsPage } from './pages/ProductsPage/ProductsPage.tsx'
import { ProductPage } from './pages/ProductPage/ProductPage.tsx'
import { CartPage } from './pages/CartPage/CartPage.tsx'
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage.tsx'
import { HomePage } from './pages/HomePage/HomePage.tsx'
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx'

import { LoginPage } from './pages/LoginPage/LoginPage.tsx'
import { checkAuthLoader } from './loaders/authLoader.ts'

import { ListPage } from './pages/dashboard/ListPage/ListPage.tsx'
import { MainPage } from './pages/dashboard/StatsPage/StatsPage.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            { index: true, element: <HomePage/> },
            { path: "productos", element: <ProductsPage/> },
            { path: "producto/:id", element: <ProductPage/> },
            { path: "carrito", element: <CartPage/>},
            { path: "checkout", element: <CheckoutPage/> },
            { path: "*", element: <ErrorPage/> },
        ],
    },
    {
        path: "/dashboard/",
        loader: checkAuthLoader,
        element: <DashboardLayout/>,
        children: [
            { index: true, element: <MainPage/>},
            { path: ":tipo", element: <ListPage/>},
            { path: "*", element: <a>PAGINA DE ERROR</a>}
        ]
    },
    { 
        path: "/login", 
        element: <LoginPage />
    },
])

function App() {
    return (
        <>
            <ShoppingCartProvider>
                <Notifications/>
                <RouterProvider router={router}></RouterProvider>
            </ShoppingCartProvider>
        </>
    )
}

export default App
