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
    destacado: boolean
    fechaIngreso: Date

    marca: Marca
    categoria: Categoria
    imagenes: Array<Imagen>
}