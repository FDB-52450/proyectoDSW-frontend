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
    await fetch('http://localhost:8080/api/administradores/logout', {
        method: 'POST',
        credentials: 'include',
    })
}