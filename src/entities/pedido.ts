import type { Cliente } from "./cliente.ts"
import type { PedidoProd } from "./pedidoProd.ts"

export interface Pedido {
    id: number,
    tipoEntrega: string,
    tipoPago: string,
    estado: string,
    precioTotal: number,
    fechaEntrega: Date
    fechaPedido: Date,

    detalle: PedidoProd[]
    cliente: Cliente
}