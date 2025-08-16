import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}

export default App
