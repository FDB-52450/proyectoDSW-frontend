import type { Producto } from "../entities/producto.ts"
import type { ProductoFilters } from "../entities/productoFilters.ts"
import { pushCreateNotification, pushDeleteNotification, pushErrorNotification, pushUpdateNotification } from "../notifications/customNotifications.tsx"

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
            if (filters.descontado) params.append('descontado', 'true')
            
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

export async function fetchProduct(id: string, showFullStock: boolean = false) {
    try {
        const url = 'http://localhost:8080/api/productos/' + Number(id) + (showFullStock ? '?view=admin' : '')
        const response = await fetch(url, {credentials: 'include'})
        const json = await response.json()

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`)
        }

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}


export async function createProduct(data: Producto) {
    try {
        const url = 'http://localhost:8080/api/productos/'
        const formData = new FormData()

        formData.append('nombre', data.nombre)
        formData.append('precio', data.precio.toString())
        formData.append('stock', data.stock!.toString())
        formData.append('marcaId', data.marca.id.toString())
        formData.append('categoriaId', data.categoria.id.toString())

        if (data.desc !== undefined) formData.append('desc', data.desc)
        if (data.descuento !== undefined) formData.append('descuento', data.descuento.toString())
        if (data.destacado !== undefined) formData.append('destacado', data.destacado.toString())
        if (data.stockReservado !== undefined) formData.append('stockReservado', data.stockReservado.toString())

        if (data.imagenes) {
            data.imagenes.forEach((img) => { if (img.file) formData.append('images', img.file)})
        }

        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })

        const json = await response.json()

        if (!response.ok) {
            pushErrorNotification(response.status, json.message)
            
            throw new Error(`Network response was not ok: ${response.status}`)
        }

        pushCreateNotification('productos')

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}

export async function updateProduct(id: string, data: Partial<Producto>) {
    try {
        const url = 'http://localhost:8080/api/productos/' + Number(id)
        const formData = new FormData()
     
        if (data.nombre !== undefined) formData.append('nombre', data.nombre)
        if (data.precio !== undefined) formData.append('precio', data.precio.toString())
        if (data.stock !== undefined) formData.append('stock', data.stock!.toString())
        if (data.marca !== undefined && data.marca.id !== undefined) formData.append('marcaId', data.marca.id.toString())
        if (data.categoria !== undefined && data.categoria.id !== undefined) formData.append('categoriaId', data.categoria.id.toString())
        if (data.desc !== undefined) formData.append('desc', data.desc)
        if (data.descuento !== undefined) formData.append('descuento', data.descuento.toString())
        if (data.destacado !== undefined) formData.append('destacado', data.destacado.toString())
        if (data.ocultado !== undefined) formData.append('ocultado', data.ocultado.toString())
        if (data.stockReservado !== undefined) formData.append('stockReservado', data.stockReservado.toString())

        if (data.imagesToRemove) data.imagesToRemove.forEach((str) => formData.append('imagesToRemove', str))
        if (data.imagenes) data.imagenes.forEach((img) => { if (img.file) formData.append('images', img.file)})

        const response = await fetch(url, {
            method: 'PATCH',
            credentials: 'include',
            body: formData,
        })

        const json = await response.json()

        if (!response.ok) {
            pushErrorNotification(response.status, json.message)

            throw new Error(`Network response was not ok: ${response.status}`)
        }

        pushUpdateNotification('productos')

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}

export async function deleteProduct(id: string) {
    try {
        const url = 'http://localhost:8080/api/productos/' + Number(id)
        const response = await fetch(url, { 
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const json = await response.json()

        if (!response.ok) {
            pushErrorNotification(response.status, json.message)

            throw new Error(`Network response was not ok: ${response.status}`)
        }

        pushDeleteNotification('productos')

        return json.message
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}