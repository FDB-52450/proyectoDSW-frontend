import type { Producto } from "./producto.ts";

export interface PedidoProd {
    producto: Producto
    cantidad: number
}