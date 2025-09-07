export interface Cliente {
    id: number,
    dni: string,
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    provincia: string,
    ciudad: string,
    direccion: string,
    codigoPostal: string,
    banStart: Date | null,
    banEnd: Date | null
}