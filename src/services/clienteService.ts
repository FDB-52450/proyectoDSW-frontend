import { pushCreateNotification, pushErrorNotification, pushUpdateNotification } from "../notifications/customNotifications.tsx"

import type { Cliente } from "../entities/cliente.ts"
import type { ClienteFilters } from "../entities/filters/clienteFilters.ts"

const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'

export async function fetchClientes(filters: ClienteFilters) {
    try {
        let url = `${apiUrl}/api/clientes/`

        if (filters) {
            const params = new URLSearchParams()

            if (filters.page) params.append('page', filters.page.toString())
            if (filters.pageSize) params.append('pageSize', filters.pageSize.toString())
            // if (filters.sort) params.append('sort', filters.sort)

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

export async function fetchCliente(id: string) {
    try {
        const url = `${apiUrl}/api/clientes/` + Number(id)
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
        const url = `${apiUrl}/api/clientes/`
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
        const url = `${apiUrl}/api/clientes/` + Number(id)
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

export async function suspendCliente(id: string, duracion: number | null, razon: string) {
    try {
        const url = `${apiUrl}/api/clientes/` + Number(id) + '/suspend'
        const data = {duracion, razon}
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

export async function reactivateCliente(id: string) {
    try {
        const url = `${apiUrl}/api/clientes/` + Number(id) + '/reactivate'
        const response = await fetch(url, { 
            method: 'POST',
            credentials: 'include',
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

export async function fetchStatusCliente(data: Partial<Cliente>) {
        try {
        const url = `${apiUrl}/api/clientes/status`
        const response = await fetch(url, { 
            method: 'POST',
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

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}