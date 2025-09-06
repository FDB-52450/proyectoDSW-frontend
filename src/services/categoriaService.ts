export async function fetchCategorias() {
    try {
        const url = 'http://localhost:8080/api/categorias/'

        const response = await fetch(url)

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

export async function fetchCategoria(id: string) {
    try {
        const url = 'http://localhost:8080/api/categorias/' + Number(id)
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