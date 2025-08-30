import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Notifications } from '@mantine/notifications'

import { ShoppingCartProvider } from './context/ShoppingCartContext.tsx'

import { DefaultLayout } from './components/layout/DefaultLayout/DefaultLayout.tsx'

import { ProductsPage } from './pages/ProductsPage/ProductsPage.tsx'
import { CartPage } from './pages/CartPage/CartPage.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            { index: true, element: <a>PAGINA PRINCIPAL</a> },
            { path: "productos", element: <ProductsPage/> },
            { path: "producto/:id", element: <a>PAGINA DE PRODUCTO</a> },
            { path: "carrito", element: <CartPage/>},
            { path: "checkout", element: <a>PAGINA DEL CHECKOUT</a> },
            { path: "*", element: <a>PAGINA DE ERROR</a> },
        ],
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
