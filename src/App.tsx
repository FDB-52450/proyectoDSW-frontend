import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { NavigationBar } from './components/layout/NavigationBar/NavigationBar.tsx'

const router = createBrowserRouter([
  // TODO: Replace template elements with actual pages.

  {path: "/", element: <a>PAGINA PRINCIPAL</a>},
  {path: "/productos/", element: <a> PAGINA DE PRODUCTO </a>},
  {path: "/producto/:id", element: <a> PAGINA DE PRODUCTO </a>},
  {path: "/carrito", element: <a>PAGINA DEL CARRITO</a>},
  {path: "/checkout", element: <a>PAGINA DEL CHECKOUT</a>},
  {path: "*", element: <a>PAGINA DE ERROR</a>},
])

function App() {
    return (
        <>
            <NavigationBar></NavigationBar>
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}

export default App
