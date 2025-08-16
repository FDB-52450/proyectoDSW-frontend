import styles from './ProductsPage.module.css'

import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'

import { ProductFilter } from "./FilterList/FilterList.tsx"
import { ProductList } from "../../components/product/ProductList/ProductList.tsx"

import { fetchProducts } from "../../services/productService.ts"
import { fetchMarcasFromProductos } from '../../services/productMarcaService.ts'

import type { Producto } from "../../entities/producto.ts"
import type { ProductoFilters } from '../../entities/productoFilters.ts'
import type { Marca } from '../../entities/marca.ts'
import type { Pagination } from '../../entities/pagination.ts'

function useParsedFiltersFromUrl(): ProductoFilters {
    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const parseNumber = (key: string): number | null => {
        const val = params.get(key)
        if (val === null || val === '') return null
        const num = Number(val)
        return isNaN(num) ? null : num
    }

    const parseBoolean = (key: string): boolean => {
        const val = params.get(key)
        return val === 'true'
    }

    const parseString = (key: string): string | null => {
        const val = params.get(key)
        return val === null || val === '' ? null : val
    }

    return {
        precioMin: parseNumber('precioMin'),
        precioMax: parseNumber('precioMax'),
        stockMin: parseNumber('stockMin') ?? 1,
        nombre: parseString('nombre'),
        destacado: parseBoolean('destacado'),
        marca: parseString('marca'),
        categoria: parseString('categoria'),
        page: parseNumber('page') ?? 1,
    }
}

export function ProductsPage() {
    const [products, setProducts] = useState<Producto[]>([])
    const [filters, setFilters] = useState<ProductoFilters>(useParsedFiltersFromUrl())
    const [marcas, setMarcas] = useState<Marca[]>([])
    const [pagination, setPagination] = useState<Pagination>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    function changePagination(pageIncrement: number) {
        if (pagination) {
            const currentPage = pagination.currentPage

            if (currentPage + pageIncrement > 0 && currentPage + pageIncrement <= pagination.totalPages) {
                setPagination({...pagination, currentPage: currentPage + pageIncrement})
                setFilters({...filters, page: currentPage + pageIncrement})
            }
        }
    }

    useEffect(() => {
        setLoading(true)
        setError(null)

        fetchProducts(filters)
        .then((res) => {
            setProducts(res.data)
            setPagination(res.pagination)
            setLoading(false)
        })
        .catch((err) => {
            setError(err.message)
            setLoading(false)
        })
    }, [filters])

    
    useEffect(() => {
        fetchMarcasFromProductos()
        .then((res) => {
            setMarcas(res)
        })
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    const categoria = filters.categoria ? filters.categoria : 'TODOS LOS PRODUCTOS'

    return (
        <>
            <div className={styles.categoriaName}>{categoria.toUpperCase()}</div>
            <div className={styles.mainContainer}>
                <div className={styles.productsWrapper}>
                    <div className={styles.filterWrapper}>
                        <ProductFilter filters={filters} updateFilter={setFilters} marcas={marcas}/>
                    </div>
                    <div className={styles.productListWrapper}>
                        <ProductList products={products}/>
                    </div>  
                </div> 
                <div className={styles.paginationWrapper}>
                    <button className={styles.paginationButton} onClick={() => changePagination(-1)}> {'< PREV PAGE'} </button>
                    <label className={styles.paginationLabel}>[ {pagination?.currentPage} / {pagination?.totalPages} ]</label>
                    <button className={styles.paginationButton} onClick={() => changePagination(1)}> {'> NEXT PAGE'} </button>
                </div>
            </div>
        </>
    )
}