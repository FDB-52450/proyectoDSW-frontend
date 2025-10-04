import { fetchProducts } from "./productService.ts"
import type { Marca } from "../entities/marca.ts"
import type { Producto } from "../entities/producto.ts"
import type { ProductoFilters } from "../entities/filters/productoFilters.ts"

export async function fetchMarcasFromProductos(filters?: ProductoFilters) {
    if (filters) {
        const newFilters: ProductoFilters = {
            precioMin: null,
            precioMax: null,
            stockMin: 1,
            nombre: null,
            destacado: false,
            marca: null,
            categoria: null,
            page: null,
        }
    }
    
    const response = await fetchProducts()
    const products = response.data
    const uniqueMarcasMap = new Map<number, Marca>()

    products.forEach((p: Producto) => {

    if (!uniqueMarcasMap.has(p.marca.id)) {
        uniqueMarcasMap.set(p.marca.id, p.marca)
    }
    })

    return Array.from(uniqueMarcasMap.values())
}