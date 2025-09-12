import { pushCreateNotification, pushErrorNotification, pushUpdateNotification } from "../notifications/customNotifications.tsx"

import type { Cliente } from "../entities/cliente.ts"

export async function fetchClientes() {
    try {
        const url = 'http://localhost:8080/api/clientes/'
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

export async function fetchCliente(id: string) {
    try {
        const url = 'http://localhost:8080/api/clientes/' + Number(id)
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

export async function createCliente(data: Cliente) {
    try {
        const url = 'http://localhost:8080/api/clientes/'
        const response = await fetch(url, { 
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) 
        })

        const json = await response.json()

        if (!response.ok) {
            pushErrorNotification(response.status, json.message)

            throw new Error(`Network response was not ok: ${response.status}`)
        }

        pushCreateNotification('clientes')

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}

export async function updateCliente(id: string, data: Cliente) {
    try {
        const url = 'http://localhost:8080/api/clientes/' + Number(id)
        const response = await fetch(url, { 
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data) 
        })

        const json = await response.json()

        if (!response.ok) {
            pushErrorNotification(response.status, json.message)
            
            throw new Error(`Network response was not ok: ${response.status}`)
        }

        pushUpdateNotification('clientes')

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}