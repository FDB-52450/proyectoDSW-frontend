import { createContext } from "react";

import type { PedidoProd } from "../entities/pedidoProd.ts";

interface CartContextType {
  cart: PedidoProd[];
  setCart: React.Dispatch<React.SetStateAction<PedidoProd[]>>;
}

export const CartContext = createContext<CartContextType | null>(null);