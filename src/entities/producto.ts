import type { Categoria } from "./categoria.ts"
import type { Marca } from "./marca.ts"
import type { Imagen } from "./imagen.ts"

export interface Producto {
    id: number
    nombre: string
    desc: string
    precio: number
    descuento: number
    precioFinal: number
    stockDisponible: number
    stock?: number,
    stockReservado?: number,
    destacado: boolean
    ocultado: boolean
    fechaIngreso: Date

    marca: Marca
    categoria: Categoria
    imagenes: Array<Imagen>

    imagesToRemove?: Array<string>
}