import styles from './CartList.module.css'

import { CartProductCard } from '../CartProductCard/CartProductCard.tsx';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext.tsx';

import { useMediaQuery } from '@mantine/hooks';

import type { PedidoProd } from '../../../entities/pedidoProd.ts';
import { Divider, Stack } from '@mantine/core';
import { MobileCartProductCard } from '../MobileCartProductCard/MobileCartProductCard.tsx';

export function CartList() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("CartContext must be used within a provider");
    }

    const {cart, setCart} = context;

    function handleRemove (id: number) {
        setCart(cart.filter((pedProd: PedidoProd) => pedProd.producto.id !== id));
    }

    function handleIncrement(id: number) {
        setCart((prev) =>
            prev.map((item) =>
            item.producto.id === id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            )
        )
    }

    function handleDecrement(id: number) {
        setCart((prev) =>
            prev.map((item) =>
            item.producto.id === id
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            )
        )
    }

    
    const isMobile = useMediaQuery('(max-width: 425px)')

    return (
        <Stack className={styles.cartListContainer}>
            {cart.map((cartProduct, index) => (
                <>{isMobile ? 
                    <MobileCartProductCard pedProd={cartProduct} 
                        increment={() => handleIncrement(cartProduct.producto.id)}
                        decrement={() => handleDecrement(cartProduct.producto.id)}
                        remove={() => handleRemove(cartProduct.producto.id)}>         
                    </MobileCartProductCard>
                    :
                    <CartProductCard pedProd={cartProduct} 
                        increment={() => handleIncrement(cartProduct.producto.id)}
                        decrement={() => handleDecrement(cartProduct.producto.id)}
                        remove={() => handleRemove(cartProduct.producto.id)}>
                    </CartProductCard>
                    }
                    {cart[index + 1] ? <Divider></Divider> : null}
                </>
            ))}
        </Stack>
    )
};