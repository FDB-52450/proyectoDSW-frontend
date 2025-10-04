import styles from './AddToCartButton.module.css'

import { useMediaQuery } from '@mantine/hooks'

import { useContext } from 'react'
import { CartContext } from '../../../context/CartContext.tsx'

import { pushAddToCart } from '../../../notifications/customNotifications.tsx'

import { Button, Tooltip } from '@mantine/core'

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
        pushAddToCart(product.nombre)
    }

    const isSmall = useMediaQuery('(max-width: 400px)')
    const noPurchaseAllowed = product.stockDisponible === 0 || product.ocultado

    return (
        <div>
            {noPurchaseAllowed ? 
            <Tooltip label='El producto no esta disponible.' position='bottom'>
                <Button size={isSmall ? 'sm' : 'lg'} leftSection={<IconShoppingCart size={isSmall ? 20 : 25}/>} onClick={addToCart} 
                disabled={noPurchaseAllowed} color='' autoContrast className={!noPurchaseAllowed ? styles.btn : ''}>
                    Agregar al carrito
                </Button>
            </Tooltip>
            :
            <Button size={isSmall ? 'sm' : 'lg'} leftSection={<IconShoppingCart size={isSmall ? 20 : 25}/>} onClick={addToCart} 
            disabled={noPurchaseAllowed} color='' autoContrast className={!noPurchaseAllowed ? styles.btn : ''}>
                Agregar al carrito
            </Button>
            }
        </div>
    )
}