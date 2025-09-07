import type { ProductoFilters } from "../entities/productoFilters.ts"

export async function fetchProducts(filters?: ProductoFilters, hideParams: boolean = false, showFullStock: boolean = false) {
    try {
        let url = 'http://localhost:8080/api/productos/'

        if (filters) {
            const params = new URLSearchParams()

            if (filters.precioMin) params.append('precioMin', filters.precioMin.toString())
            if (filters.precioMax) params.append('precioMax', filters.precioMax.toString())
            if (filters.nombre && filters.nombre !== '') params.append('nombre', filters.nombre)
            if (filters.destacado) params.append('destacado', 'true')
            if (filters.marca && filters.marca !== '') params.append('marca', filters.marca)
            if (filters.categoria && filters.categoria !== '') params.append('categoria', filters.categoria)
            if (filters.page) params.append('page', filters.page.toString())
            if (filters.pageSize) params.append('pageSize', filters.pageSize.toString())
            if (filters.sort) params.append('sort', filters.sort)
            
            if (showFullStock) params.append('view', 'admin')

            const queryString = params.toString()

            if (queryString) {
                url += `?${queryString}`

                if (!hideParams) {
                    const newRelativePathQuery = window.location.pathname + '?' + queryString
                    window.history.replaceState(null, '', newRelativePathQuery)
                }
            } else {
                if (!hideParams) window.history.replaceState(null, '', window.location.pathname)
            }
        }

        const response = await fetch(url, { credentials: 'include' })

        if (!response.ok) {
            if (response.status === 404) {
                return []
            } else {
                throw new Error(`Network response was not ok: ${response.status}`)
            }
        }

        const json = await response.json()

        return json
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}

export async function fetchProduct(id: string) {
    try {
        const url = 'http://localhost:8080/api/productos/' + Number(id)
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}