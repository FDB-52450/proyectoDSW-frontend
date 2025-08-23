import { useState } from "react"

import type { ProductoFilters } from "../../../entities/productoFilters.ts"
import type { Marca } from "../../../entities/marca.ts"

import {
  Box,
  Stack,
  Text,
  TextInput,
  NumberInput,
  Checkbox,
  Select,
  Button,
  Group,
  Divider,
} from '@mantine/core';

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

    return (
        <Box style={{ fontFamily: 'Montserrat, sans-serif', paddingTop: 20 }}>
            <Text fw={700} style={{ fontSize: 25 }}>FILTROS</Text>
            <Divider my='md'></Divider>

            <Stack gap="sm">
                {/* Precio */}
                <Box>
                    <Text size="md" mb={5}>Rango de precios:</Text>
                    <Group gap={5} mb={10}>
                        <NumberInput
                        id="precioMin"
                        placeholder="Minimo"
                        leftSection={<span>$</span>}
                        leftSectionWidth={25}
                        rightSection={<></>}
                        value={localFilters.precioMin ?? ''}
                        onChange={(value) => handleInputChange('precioMin', value ?? undefined)}
                        decimalSeparator=","
                        thousandSeparator="."
                        allowNegative={false}
                        allowDecimal={false}
                        w={110}
                        />
                        <NumberInput
                        id="precioMax"
                        placeholder="Maximo"
                        leftSection={<span>$</span>}
                        leftSectionWidth={25}
                        rightSection={<></>}
                        value={localFilters.precioMax ?? ''}
                        onChange={(value) => handleInputChange('precioMax', value ?? undefined)}
                        decimalSeparator=","
                        thousandSeparator="."
                        allowNegative={false}
                        allowDecimal={false}
                        w={110}
                        />
                    </Group>
                </Box>

                {/* Nombre */}
                <Box>
                    <Text size="md" mb={5}>Nombre:</Text>
                    <TextInput mb={10}
                        id="nombre"
                        placeholder=""
                        value={localFilters.nombre ?? ''}
                        onChange={(e) => handleInputChange('nombre', e.currentTarget.value)}
                    />
                </Box>

                {/* Marcas */}
                <Box>
                    <Text size="md" mb={5}>Marcas:</Text>
                    <Select mb={10}
                        size='sm'
                        id="marca"
                        placeholder="Todas"
                        value={localFilters.marca ?? ''}
                        style={{ fontFamily: 'Montserrat, sans-serif'}}
                        data={[{ value: '', label: 'Todas' }, ...marcas.map((m) => ({ value: m.nombre, label: m.nombre.toUpperCase() }))]}
                        onChange={(value) => handleInputChange('marca', value ?? '')}
                    />
                </Box>

                {/* Destacado */}
                <Box mb={-5}>
                    <Checkbox
                        id="destacado"
                        label="Destacado"
                        checked={localFilters.destacado}
                        onChange={(e) => handleInputChange('destacado', e.currentTarget.checked)}
                    />
                </Box>

                {/* Sin Stock */}
                <Box>
                    <Checkbox
                        id="stockMin"
                        label="Sin Stock"
                        checked={localFilters.stockMin === 0}
                        onChange={(e) => handleStockMinToggle(e.currentTarget.checked)}
                    />
                </Box>

                <Button mt={20} onClick={() => updateFilter(localFilters)}> APLICAR CAMBIOS </Button>
            </Stack>
        </Box>
    )
}