import styles from './ProductsPage.module.css'

import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'

import { fetchProducts } from "../../services/productService.ts"
import { fetchMarcasFromProductos } from '../../services/productMarcaService.ts'

import { Badge,  Button, Collapse, Flex, Group, LoadingOverlay, Stack } from '@mantine/core'

import { ProductList } from "../../components/product/ProductList/ProductList.tsx"
import { FilterList } from './FilterList/FilterList.tsx'
import { NotFoundError } from './NotFoundError/NotFoundError.tsx'
import { SortMenu } from './SortMenu/SortMenu.tsx'
import { CustomPagination } from './Pagination/CustomPagination.tsx'

import { IconFilter2 } from '@tabler/icons-react'

import type { Producto } from "../../entities/producto.ts"
import type { ProductoFilters } from '../../entities/filters/productoFilters.ts'
import type { Marca } from '../../entities/marca.ts'
import type { Pagination as PaginationType } from '../../entities/pagination.ts'

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
    const [pagination, setPagination] = useState<PaginationType>({totalItems: 1, totalPages: 1, currentPage: 1, pageSize: 20})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [opened, { toggle }] = useDisclosure(false);

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
  
    const isLaptop = useMediaQuery('(max-width: 1024px)')
    const isMobile = useMediaQuery('(max-width: 768px)')

    if (error) return <div>Error: {error}</div>

    const categoria = filters.categoria ? filters.categoria : 'TODOS LOS PRODUCTOS'

    return (
        <Stack w='100%'>    
            <LoadingOverlay visible={loading} loaderProps={{size: '100px'}}></LoadingOverlay>
            <Badge variant="gradient" gradient={{ from: 'blue.7', to: 'blue.5', deg: 90 }} radius='0' size={isMobile ? '30px' : (isLaptop ? '35px' : '40px')} fullWidth h={100}
            style={{display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'center', paddingRight: 10, textShadow: '1px 1px 3px rgba(0,0,0,0.25)'}}>
                {categoria}
            </Badge>

            <Stack justify='center' w={isMobile ? '100%' : (isLaptop ? '85%' : '70%')} m='auto'>
                <Stack align='center'>
                    <Group>
                        <SortMenu filters={filters} updateFilter={setFilters}></SortMenu>
                        <Button variant='default' onClick={toggle} rightSection={<IconFilter2 size={18}/>} 
                        className={styles.button} hiddenFrom='md'>Filtros</Button> 
                    </Group>
                    <Collapse in={opened} w='85%'>
                        <FilterList filters={filters} updateFilter={setFilters} marcas={marcas}></FilterList>
                    </Collapse>
                </Stack>
                <Flex justify='center' align='flex-start' direction='row'>
                    <Stack visibleFrom='md' w='30%'>
                        <FilterList filters={filters} updateFilter={setFilters} marcas={marcas}></FilterList>
                    </Stack>
                    <Stack mt='-20px' w='100%'>
                        {products.length > 0 ? <ProductList products={products}/> : <NotFoundError></NotFoundError>}
                    </Stack>
                </Flex>
                <Group justify='center'>
                    <CustomPagination pagination={pagination} changePagination={changePagination}></CustomPagination>
                </Group>
            </Stack>
        </Stack>
    )
}