import { useState, useEffect } from "react";
import { CartContext } from "./CartContext.tsx";
import type { PedidoProd } from "../entities/pedidoProd.ts";

interface Props {
  children: React.ReactNode;
}

export function ShoppingCartProvider({children }: Props) {
    const [cart, setCart] = useState<PedidoProd[]>(() => {
        const savedCart = localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    return (
        <CartContext value={{cart, setCart}}>
            {children}
        </CartContext>
    )
}