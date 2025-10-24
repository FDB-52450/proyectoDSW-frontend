const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'

export async function fetchStats(typeStats: string) {
    try {
        const url = `${apiUrl}/api/stats/` + typeStats
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