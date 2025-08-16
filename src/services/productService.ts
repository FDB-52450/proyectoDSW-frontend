import type { ProductoFilters } from "../entities/productoFilters.ts";

export async function fetchProducts(filters?: ProductoFilters) {
    try {
        let url = 'http://localhost:8080/api/productos/';

        if (filters) {
            const params = new URLSearchParams();

            if (filters.precioMin) params.append('precioMin', filters.precioMin.toString())
            if (filters.precioMax) params.append('precioMax', filters.precioMax.toString())
            if (filters.nombre && filters.nombre !== '') params.append('nombre', filters.nombre)
            if (filters.destacado) params.append('destacado', 'true')
            if (filters.marca && filters.marca !== '') params.append('marca', filters.marca)
            if (filters.categoria && filters.categoria !== '') params.append('categoria', filters.categoria)
            if (filters.page) params.append('page', filters.page.toString())
            if (filters.pageSize) params.append('pageSize', filters.pageSize.toString())

            const queryString = params.toString();

            if (queryString) {
                url += `?${queryString}`;

                const newRelativePathQuery = window.location.pathname + '?' + queryString;
                window.history.replaceState(null, '', newRelativePathQuery);
            } else {
                window.history.replaceState(null, '', window.location.pathname);
            }
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const json = await response.json();

        return json;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred while fetching products');
        }
    }
}