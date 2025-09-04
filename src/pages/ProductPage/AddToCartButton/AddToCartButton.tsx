import styles from './AddToCartButton.module.css'

import { useMediaQuery } from '@mantine/hooks'

import { useContext } from 'react'
import { CartContext } from '../../../context/CartContext.tsx'

import { Button } from '@mantine/core'

import { IconShoppingCart } from '@tabler/icons-react'

import type { Producto } from "../../../entities/producto.ts"
import type { PedidoProd } from '../../../entities/pedidoProd.ts'

export function AddToCartButton({product}: {product: Producto}) {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error("CartContext must be used within a provider")
    }

    const {setCart} = context

    function addToCart() {
        setCart((currItems: Array<PedidoProd>) => {
            const isItemsFound = currItems.find((item: PedidoProd) => item.producto.id === product.id)

            if (isItemsFound) {
                return currItems.map((item) => {
                    if (item.producto.id === product.id) {
                        return { ...item, cantidad: item.cantidad + 1 }
                    } else {
                        return item
                    }
                })
            } else {
                const pedProd: PedidoProd = {producto: product, cantidad: 1}
                return [...currItems, pedProd]
            }
        })
    }

    const isSmall = useMediaQuery('(max-width: 400px)')

    return (
        <div className={styles.animatedRgbBorderA}>
            <Button size={isSmall ? 'sm' : 'lg'} leftSection={<IconShoppingCart size={isSmall ? 20 : 25}/>} onClick={addToCart} disabled={product.stockDisponible === 0}
            color='' autoContrast className={product.stockDisponible > 0 ? styles.btn : ''}>Agregar al carrito</Button>
        </div>
    )
}

/*
/*style={{
    border: 'none',
    backgroundColor: clicked ? 'transparent' : '',
    color: clicked ? '#ffffffff' : '',
    transition: 'background-color 0.4s ease',
}}
*/