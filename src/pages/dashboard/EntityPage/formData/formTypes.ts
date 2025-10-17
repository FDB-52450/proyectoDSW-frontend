import type { Imagen } from "../../../../entities/imagen.ts";
import type { PedidoProd } from "../../../../entities/pedidoProd.ts";

export type FormConfig<T extends object> = {
    initialValues: T,
    validate: {
        [K in keyof T]?: (value: T[K]) => string | null
    }
}

export type ProductoFormValues = {
    nombre: string,
    desc: string,
    precio: string,
    descuento: string
    stock: string,
    stockReservado: number | null,
    destacado: boolean,
    ocultado: boolean,
    marca: { id: number },
    categoria: { id: number },
    imagenes: Imagen[],
    imagesToRemove: string[] | undefined
}

export type CategoriaFormValues = {
    nombre: string,
    duracionGarantia: number,
    stockLimit: number
}

export type MarcaFormValues = {
    nombre: string,
    keepImage: boolean | undefined,
    imagen: Imagen | null
}

export type PedidoFormValues = {
    tipoEntrega: string,
    tipoPago: string,
    estado: string,
    fechaEntrega: Date
    detalle: PedidoProd[] | undefined
}

export type ClienteFormValues = {
    dni: string,
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    provincia: string,
    ciudad: string,
    direccion: string,
    codigoPostal: string,
    banStart: null | Date,
    banEnd: null | Date,
    banRazon: string
}


export type AdminFormValues = {
    nombre: string,
    password: string,
    role: string,
}
