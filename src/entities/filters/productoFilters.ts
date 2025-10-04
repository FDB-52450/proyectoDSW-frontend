export interface ProductoFilters {
  precioMin?: number | null
  precioMax?: number | null
  stockMin?: number | null
  stockMax?: number | null
  nombre?: string | null
  destacado?: boolean
  descontado?: boolean
  marca?: string | null
  categoria?: string | null
  sort?: string | null
  page: number | null
  pageSize?: number | null
}