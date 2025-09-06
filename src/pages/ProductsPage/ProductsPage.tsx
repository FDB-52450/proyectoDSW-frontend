import styles from './ProductsPage.module.css'

import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'

import { Group } from '@mantine/core'

import { ProductList } from "../../components/product/ProductList/ProductList.tsx"
import { FilterList } from './FilterList/FilterList.tsx'
import { NotFoundError } from './NotFoundError/NotFoundError.tsx'
import { SortMenu } from './SortMenu/SortMenu.tsx'

import { fetchProducts } from "../../services/productService.ts"
import { fetchMarcasFromProductos } from '../../services/productMarcaService.ts'

import type { Producto } from "../../entities/producto.ts"
import type { ProductoFilters } from '../../entities/productoFilters.ts'
import type { Marca } from '../../entities/marca.ts'
import type { Pagination as PaginationType } from '../../entities/pagination.ts'
import { CustomPagination } from './Pagination/CustomPagination.tsx'


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
    const [pagination, setPagination] = useState<PaginationType>({totalProducts: 1, totalPages: 1, currentPage: 1, pageSize: 20})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    function changePagination(pageValue: number) {
        if (pagination) {
            if (pageValue > 0 && pageValue <= pagination.totalPages) {
                setPagination({...pagination, currentPage: pageValue})
                setFilters({...filters, page: pageValue})
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
            <div className={styles.categoriaName}>{categoria.toUpperCase()}
                {/*<Text fw={500} style={{ fontSize: 40 }}>{categoria.toUpperCase()}</Text>*/}
            </div>
            <div className={styles.mainContainer}>
                <Group className={styles.sortWrapper} justify='flex-end'>
                    <SortMenu filters={filters} updateFilter={setFilters}></SortMenu>
                </Group>
                <div className={styles.productsWrapper}>
                    <div className={styles.filterWrapper}>
                        <FilterList filters={filters} updateFilter={setFilters} marcas={marcas}></FilterList>
                    </div>
                    <div className={styles.productListWrapper}>
                        {products.length > 0 ? <ProductList products={products}/> : <NotFoundError></NotFoundError>}
                    </div>  
                </div>
                <CustomPagination pagination={pagination} changePagination={changePagination}></CustomPagination>
            </div>
        </>
    )
}