import styles from './FilterList.module.css'

import { useState } from "react"

import { Box, Stack, Text, TextInput, NumberInput, Checkbox, Select, Button, Divider, Flex} from '@mantine/core'

import type { ProductoFilters } from "../../../entities/filters/productoFilters.ts"
import type { Marca } from "../../../entities/marca.ts"
import { useMediaQuery } from '@mantine/hooks'

interface ProductFilterProps {
    filters: ProductoFilters
    updateFilter: (prodFilters: ProductoFilters) => void
    marcas: Array<Marca>
}

export function FilterList({filters, updateFilter, marcas}: ProductFilterProps) {
    const [localFilters, setLocalFilters] = useState<ProductoFilters>(filters)
 
    const handleInputChange = (id: keyof ProductoFilters, value: string | number | boolean) => {
        setLocalFilters((prev) => ({ ...prev, [id]: value }))
    }

    const handleStockMinToggle = (checked: boolean) => {
        setLocalFilters((prev) => ({ ...prev, stockMin: checked ? 0 : undefined }));
    }

    const emptyFilters: ProductoFilters = {
        precioMin: undefined,
        precioMax: undefined,
        stockMin: 1,
        nombre: undefined,
        destacado: false,
        marca: undefined,
        categoria: filters.categoria,
        page: 1,
    }

    const isLaptop = useMediaQuery('(max-width: 1024px)')
    const isMobile = useMediaQuery('(max-width: 768px)')
    const isLaptopButNotMobile = isLaptop && !isMobile

    return (
        <Box className={styles.filterContainer}>
            <Text fw={475} size='25px'>FILTROS</Text>
            <Divider my='md'></Divider>
            <Stack gap="sm">
                <Box>
                    <Text size="md" mb={5}>Rango de precios:</Text>
                    <Flex gap={5} mb={10} justify='space-between' align='center' direction={isLaptopButNotMobile ? 'column' : 'row'}>
                        <NumberInput id="precioMin" placeholder="Minimo" leftSection={<span>$</span>} leftSectionWidth={25} rightSection={<></>}
                        value={localFilters.precioMin ?? ''} onChange={(value) => handleInputChange('precioMin', value ?? undefined)}
                        decimalSeparator="," thousandSeparator="." allowNegative={false} allowDecimal={false} w={isLaptopButNotMobile ? '100%' : '45%'}/>
                        {isLaptopButNotMobile ? null : <Text>-</Text>}
                        <NumberInput id="precioMax" placeholder="Maximo" leftSection={<span>$</span>} leftSectionWidth={25} rightSection={<></>}
                        value={localFilters.precioMax ?? ''} onChange={(value) => handleInputChange('precioMax', value ?? undefined)}
                        decimalSeparator="," thousandSeparator="." allowNegative={false} allowDecimal={false} w={isLaptopButNotMobile ? '100%' : '45%'}/>
                    </Flex>
                </Box>

                <Box>
                    <Text size="md" mb={5}>Nombre:</Text>
                    <TextInput mb={10} id="nombre" placeholder=""
                    value={localFilters.nombre ?? ''}onChange={(e) => handleInputChange('nombre', e.currentTarget.value)}/>
                </Box>

                <Box>
                    <Text size="md" mb={5}>Marcas:</Text>
                    <Select mb={10} size='sm' id="marca" placeholder="Todas" value={localFilters.marca ?? ''}
                    data={[{ value: '', label: 'Todas' }, ...marcas.map((m) => ({ value: m.nombre, label: m.nombre.toUpperCase()}))]}
                    onChange={(value) => handleInputChange('marca', value ?? '')}/>
                </Box>

                <Box mb={-5}>
                    <Checkbox id="destacado" label="Destacado" checked={localFilters.destacado}
                    onChange={(e) => handleInputChange('destacado', e.currentTarget.checked)}/>
                </Box>

                <Box>
                    <Checkbox id="stockMin" label="Sin Stock" checked={localFilters.stockMin === 0} 
                    onChange={(e) => handleStockMinToggle(e.currentTarget.checked)}/>
                </Box>

                <Button mt={20} onClick={() => updateFilter(localFilters)}> APLICAR FILTROS </Button>
                <Button color='red' onClick={() => updateFilter(emptyFilters)}> BORRAR FILTROS </Button>
            </Stack>
        </Box>
    )
}