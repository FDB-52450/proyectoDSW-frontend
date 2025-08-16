import { useState} from "react";
import { CartContext } from "./CartContext.tsx";
import type { PedidoProd } from "../entities/pedidoProd.ts";

interface Props {
  children: React.ReactNode;
}

export function ShoppingCartProvider({children }: Props) {
    const [cart, setCart] = useState<PedidoProd[]>([]);

    return (
        <CartContext value={{cart, setCart}}>
            {children}
        </CartContext>
    )
}