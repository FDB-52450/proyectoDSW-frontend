import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { ShoppingCartProvider } from '../../src/context/ShoppingCartContext.tsx'

import { ProductCard } from '../../src/components/product/ProductCard/ProductCard.tsx'
import { BrowserRouter } from 'react-router-dom'

import { Producto } from '../../src/entities/producto.ts'
import { MantineProvider } from '@mantine/core'

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

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <MantineProvider>
            <ShoppingCartProvider>
                <BrowserRouter>{ui}</BrowserRouter>
            </ShoppingCartProvider>
        </MantineProvider>
    );
};

describe('ProductCard', () => {
    it('muestra correctamente el precio y nombre de producto', () => {
        renderWithProviders(<ProductCard product={mockProduct} />);

        expect(screen.getByText(mockProduct.nombre)).toBeInTheDocument()
        expect(screen.getByText(`$${mockProduct.precioFinal.toLocaleString('es-AR')}`)).toBeInTheDocument()
        expect(screen.getByText(`-${mockProduct.descuento}%`)).toBeInTheDocument()
    })

    it('muestra icono de destacado si el producto esta destacado', () => {
        renderWithProviders(<ProductCard product={mockProduct} />)

        expect(screen.getByTestId('destacado-icon')).toBeInTheDocument()
    })

    it('muestra icono de no imagen si no hay imagen', () => {
        renderWithProviders(<ProductCard product={mockProduct} />)

        expect(screen.getByText('Sin imagen')).toBeInTheDocument()
    })
})

