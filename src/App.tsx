import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ShoppingCartProvider } from './context/ShoppingCartContext.tsx'

import { NavigationBar } from './components/layout/NavigationBar/NavigationBar.tsx'
import { Footer } from './components/layout/Footer/Footer.tsx'

import { ProductsPage } from './pages/ProductsPage/ProductsPage.tsx'

const router = createBrowserRouter([
  // TODO: Replace template elements with actual pages.

  {path: "/", element: <a>PAGINA PRINCIPAL</a>},
  {path: "/productos/", element: <ProductsPage></ProductsPage>},
  {path: "/producto/:id", element: <a> PAGINA DE PRODUCTO </a>},
  {path: "/carrito", element: <a>PAGINA DEL CARRITO</a>},
  {path: "/checkout", element: <a>PAGINA DEL CHECKOUT</a>},
  {path: "*", element: <a>PAGINA DE ERROR</a>},
])

function App() {
    return (
        <>
            <ShoppingCartProvider>
                <NavigationBar></NavigationBar>
                <RouterProvider router={router}></RouterProvider>
                <Footer></Footer>
            </ShoppingCartProvider>
        </>
    )
}

export default App
