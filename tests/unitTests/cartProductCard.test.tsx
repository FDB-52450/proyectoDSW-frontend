import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { ShoppingCartProvider } from '../../src/context/ShoppingCartContext.tsx'

import { CartProductCard } from '../../src/components/cart/CartProductCard/CartProductCard.tsx'
import { BrowserRouter } from 'react-router-dom'

import { MantineProvider } from '@mantine/core'
import { PedidoProd } from '../../src/entities/pedidoProd.ts'
import { Producto } from '../../src/entities/producto.ts'

const mockProduct: Producto = {
    id: 1,
    nombre: 'Laptop Gamer',
    desc: 'Una laptop potente',
    precio: 200000,
    descuento: 20,
    precioFinal: 160000,
    stockDisponible: 5,
    destacado: true,
    ocultado: false,
    fechaIngreso: new Date(),
    marca: { id: 1, nombre: 'MarcaX', imagen: null, keepImage: false },
    categoria: { id: 1, nombre: 'Laptops', duracionGarantia: 24, stockLimit: 5 },
    imagenes: []
};


const mockPedProd: PedidoProd = {
    producto: mockProduct,
    cantidad: 2
};

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <MantineProvider>
            <ShoppingCartProvider>
                <BrowserRouter>{ui}</BrowserRouter>
            </ShoppingCartProvider>
        </MantineProvider>
    );
};

function voidFunction() {}

describe('CartProductCard', () => {
    it('muestra correctamente el nombre y precio del producto y su cantidad', () => {
        renderWithProviders(<CartProductCard pedProd={mockPedProd} increment={voidFunction} decrement={voidFunction} remove={voidFunction}/>);

        expect(screen.getByText(mockProduct.nombre)).toBeInTheDocument()
        expect(screen.getByText(`$${mockProduct.precioFinal.toLocaleString('es-AR')}`)).toBeInTheDocument()
        expect(screen.getByText(mockPedProd.cantidad)).toBeInTheDocument()
    })
})

