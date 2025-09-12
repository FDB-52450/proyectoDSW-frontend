import { pushCreateNotification, pushDeleteNotification, pushErrorNotification, pushUpdateNotification } from "../notifications/customNotifications.tsx"

import type { Administrador } from "../entities/administrador.ts"

export async function fetchCurrentUser() {
    const res = await fetch('http://localhost:8080/api/administradores/me', { credentials: 'include' })

    if (!res.ok) {
        return null
    }

    return await res.json()
}

export async function login(username: string, password: string) {
    const res = await fetch('http://localhost:8080/api/administradores/login', { 
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: username,
            password: password
        }) 
    })

    if (!res.ok) {
        return false
    }

    return true
}

export async function logout() {
    await fetch('http://localhost:8080/api/administradores/logout', { credentials: 'include' })
}

export async function fetchAdmins() {
    try {
        const url = 'http://localhost:8080/api/administradores/'
        const response = await fetch(url, {credentials: 'include'})
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

export async function fetchAdmin(id: string) {
    try {
        const url = 'http://localhost:8080/api/administradores/' + Number(id)
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


export async function createAdmin(data: Administrador) {
    try {
        const url = 'http://localhost:8080/api/administradores/'
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

        pushCreateNotification('administradores')

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}

export async function updateAdmin(id: string, data: Administrador) {
    try {
        const url = 'http://localhost:8080/api/administradores/' + Number(id)
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

        pushUpdateNotification('administradores')

        return json.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}

export async function deleteAdmin(id: string) {
    try {
        const url = 'http://localhost:8080/api/administradores/' + Number(id)
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

        pushDeleteNotification('administradores')

        return json.message
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('Unknown error occurred while fetching products')
        }
    }
}