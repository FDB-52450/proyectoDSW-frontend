import { pushCreatePedido, pushErrorNotification, pushUpdateNotification } from "../notifications/customNotifications.tsx"

import type { Pedido } from "../entities/pedido.ts"
import type { PedidoFilters } from "../entities/filters/pedidoFilters.ts"
import dayjs from "dayjs"

export async function fetchPedidos(filters?: PedidoFilters) {
    try {
        let url = 'http://localhost:8080/api/pedidos/'

        if (filters) {
            const params = new URLSearchParams()

            if (filters.estado) params.append('estado', filters.estado)
            if (filters.page) params.append('page', filters.page.toString())
            if (filters.pageSize) params.append('pageSize', filters.pageSize.toString())
            if (filters.sort) params.append('sort', filters.sort)

            const queryString = params.toString()

            if (queryString) url += `?${queryString}`
        }

        const response = await fetch(url, { credentials: 'include' })
        const json = await response.json()

        if (!response.ok) {
            if (response.status === 404) {
                return []
            } else {
                throw new Error(`Network response was not ok: ${response.status}`)
            }
        }

        return json
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}

export async function fetchPedido(id: string) {
    try {
        const url = 'http://localhost:8080/api/pedidos/' + Number(id)
        const response = await fetch(url, { credentials: 'include' })
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


export async function createPedido(data: Partial<Pedido>) {
    try {
        const simpleDetalle = data.detalle!.map((pedProd) => ({productoId: pedProd.producto.id, cantidad: pedProd.cantidad}))
        const simpleData = {...data, fechaEntrega: dayjs(data.fechaEntrega).format('YYYY-MM-DD'), detalle: simpleDetalle}

        const url = 'http://localhost:8080/api/pedidos/'
        const response = await fetch(url, { 
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(simpleData) 
        })

        const json = await response.json()

        if (!response.ok) {
            pushErrorNotification(response.status, json.message)

            throw new Error(`Network response was not ok: ${response.status}`)
        }

        pushCreatePedido()

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}

export async function updatePedido(id: string, data: Partial<Pedido>) {
    try {
        let simpleData 

        if (data.fechaEntrega) {
            simpleData = {...data, fechaEntrega: dayjs(data.fechaEntrega).format('YYYY-MM-DD')}
        } else {
            simpleData = data
        }

        const url = 'http://localhost:8080/api/pedidos/' + Number(id)
        const response = await fetch(url, { 
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(simpleData) 
        })

        const json = await response.json()

        if (!response.ok) {
            pushErrorNotification(response.status, json.message)

            throw new Error(`Network response was not ok: ${response.status}`)
        }

        pushUpdateNotification('pedidos')

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}