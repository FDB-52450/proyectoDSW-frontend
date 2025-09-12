import styles from './ListPage.module.css'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchProducts } from "../../../services/productService.ts";
import { fetchCategorias } from "../../../services/categoriaService.ts";
import { fetchMarcas } from '../../../services/marcaService.ts';
import { fetchPedidos } from '../../../services/pedidoService.ts';
import { fetchClientes } from '../../../services/clienteService.ts';

import { Box, Divider, Group, LoadingOverlay, Pagination, Stack, Table, Title } from "@mantine/core"

import { ListRow, ListTitleRow } from "./ListRow/ListRow.tsx";
import { SearchBar } from "./SearchBar/SearchBar.tsx";
import { SortMenu } from "./SortMenu/SortMenu.tsx";
import { ImageModal } from './ImageModal/ImageModal.tsx';

import type { Producto } from "../../../entities/producto.ts";
import type { Marca } from "../../../entities/marca.ts";
import type { Categoria } from "../../../entities/categoria.ts";
import type { ProductoFilters } from "../../../entities/productoFilters.ts";
import type { Pagination as PaginationType } from "../../../entities/pagination.ts";
import type { Pedido } from '../../../entities/pedido.ts';
import type { Cliente } from '../../../entities/cliente.ts';

type Tipo = 'productos' | 'marcas' | 'categorias' | 'pedidos' | 'clientes'

const initialFilters: ProductoFilters = {
    nombre: null,
    page: 1,
    sort: null,
}

export function ListPage() {
    const [data, setData] = useState<Producto[] | Marca[] | Categoria[] | Pedido[] | Cliente[]>([])
    const [filters, setFilters] = useState<ProductoFilters>(initialFilters)
    const [pagination, setPagination] = useState<PaginationType>({totalProducts: 1, totalPages: 1, currentPage: 1, pageSize: 20})

    const [viewItem, setViewItem] = useState<Producto | Marca | Categoria | Pedido | Cliente | null>(null)
    const [viewImageIdx, setViewImageIdx] = useState<number>(0)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    let { tipo } = useParams<{ tipo: Tipo }>();

    if (tipo === undefined) tipo = 'productos'
    
    useEffect(() => {
        setLoading(true)
        setError(null)

        if (tipo === 'productos') {
            fetchProducts(filters, true, true)
            .then((res) => {
                setData(res.data)
                setPagination(res.pagination)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
        } else if (tipo === 'marcas') {
            fetchMarcas()
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
        } else if (tipo === 'categorias') {
            fetchCategorias()
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
        } else if (tipo === 'pedidos') {
            fetchPedidos()
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
        } else if (tipo === 'clientes') {
            fetchClientes()
            .then((res) => {
                setData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
        }
    }, [tipo, filters])

    if (error) return <div>Error: {error}</div>

    const rows = data.map((d) => (
        <Table.Tr key={d.id}>
            <ListRow tipo={tipo} item={d} setViewItem={setViewItem} setViewImageIdx={setViewImageIdx}/>
        </Table.Tr>
    ));

    function capitalize(str: string) { 
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    function changePagination(pageValue: number) {
        if (pagination) {
            if (pageValue > 0 && pageValue <= pagination.totalPages) {
                setPagination({...pagination, currentPage: pageValue})
                setFilters({...filters, page: pageValue})
            }
        }
    }

    return (
        <Box w='100%' pos='relative'>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} loaderProps={{size: 75}}/> 
            <Stack m={25} p={30} className={styles.listContainer}>
                <Title>{capitalize(tipo)}</Title>
                <Divider></Divider>
                <Group justify="space-between">
                    <SearchBar filters={filters} updateFilter={setFilters}/>
                    <SortMenu filters={filters} updateFilter={setFilters}></SortMenu>
                </Group>
                <Table highlightOnHover verticalSpacing={5}>
                    <Table.Thead>
                        <Table.Tr>
                            <ListTitleRow tipo={tipo}/>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                <Group justify="flex-end" mt={15}>
                    <Pagination total={pagination.totalPages} value={pagination.currentPage} onChange={(value: number) => changePagination(value)} withEdges/>
                </Group>
                <ImageModal item={viewItem} tipo={tipo} imgIdx={viewImageIdx} setViewItem={setViewItem} setViewImageIdx={setViewImageIdx}></ImageModal>
            </Stack>
        </Box>
    )
}