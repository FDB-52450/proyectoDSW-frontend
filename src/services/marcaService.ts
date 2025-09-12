import { pushCreateNotification, pushDeleteNotification, pushErrorNotification, pushUpdateNotification } from "../notifications/customNotifications.tsx"

import type { Marca } from "../entities/marca.ts"

export async function fetchMarcas() {
    try {
        const url = 'http://localhost:8080/api/marcas/'
        const response = await fetch(url)
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

export async function fetchMarca(id: string) {
    try {
        const url = 'http://localhost:8080/api/marcas/' + Number(id)
        const response = await fetch(url)
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

export async function createMarca(data: Marca) {
    try {
        const url = 'http://localhost:8080/api/marcas/'
        const formData = new FormData()

        formData.append('nombre', data.nombre)

        if (data.imagen && data.imagen.file) formData.append('imagen', data.imagen.file)

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

        pushCreateNotification('marcas')

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}

export async function updateMarca(id: string, data: Marca) {
    try {
        const url = 'http://localhost:8080/api/marcas/' + Number(id)
        const formData = new FormData()

        if (data.nombre) formData.append('nombre', data.nombre)

        if (data.imagen && data.imagen.file) formData.append('imagen', data.imagen.file)

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

        pushUpdateNotification('marcas')

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}

export async function deleteMarca(id: string) {
    try {
        const url = 'http://localhost:8080/api/marcas/' + Number(id)
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

        pushDeleteNotification('marcas')

        return json.message
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}