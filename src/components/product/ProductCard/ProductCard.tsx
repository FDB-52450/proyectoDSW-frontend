import styles from './ProductCard.module.css'

import { CartContext } from '../../../context/CartContext.tsx'
import { useContext } from 'react'

import type { PedidoProd } from '../../../entities/pedidoProd.ts'
import type { Producto } from '../../../entities/producto.ts'

export function Card({product}: {product: Producto}) {
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

    return (
        <div className={styles.mainContainer}>
            <img className={styles.productImage} src="/src/assets/testImage.png" alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <div className={styles.productContainer}>
                <div className={styles.priceContainer}>
                    {product.descuento != 0 ? <span className={styles.originalPrice}>${product.precio.toLocaleString('es-AR')}</span> : ''}
                    <span className={styles.price}>${(product.precio - (product.precio * product.descuento) / 100).toLocaleString('es-AR')}</span>
                </div>
                <button className={styles.cartButton} onClick={addToCart}>CART</button>
            </div>
        </div>
    )
}