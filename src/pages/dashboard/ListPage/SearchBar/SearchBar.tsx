import { useState } from 'react'
import { ActionIcon, Group, Paper, Text, TextInput } from '@mantine/core';
import { IconArrowRight, IconSearch, IconX } from '@tabler/icons-react';

import type { ProductoFilters } from '../../../../entities/filters/productoFilters.ts';

import styles from './SearchBar.module.css';

interface SearchBarProps {
    filters: ProductoFilters
    updateFilter: (prodFilters: ProductoFilters) => void
}

export function SearchBar({filters, updateFilter}: SearchBarProps) {
    const [localFilters, setLocalFilters] = useState<ProductoFilters>(filters)
 
    const handleInputChange = (value: string) => {
        setLocalFilters((prev) => ({ ...prev, nombre: value}))
    }

    function handleKeyDown (event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            updateFilter(localFilters);
        }
    }

    return (
        <Group>
        <TextInput
            radius="md"
            size="md"
            placeholder="Buscar productos"
            rightSectionWidth={42}
            leftSection={<IconSearch size={18} stroke={1.5} />}
            rightSection={
                <ActionIcon size={30} radius="sm" color='blue' variant="outline"
                className={styles.hoverFilledIcon} onClick={() => updateFilter(localFilters)}>
                    <IconArrowRight size={18} stroke={1.5} />
                </ActionIcon>
            }
            onChange={(e) => handleInputChange(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
        />
            {filters.nombre ? 
            <Paper radius="sm" shadow="xs">
                <Group justify='flex-start' gap={5} pr={10}>
                    <ActionIcon variant="transparent" onClick={() => updateFilter({...localFilters, nombre: null})}>
                        <IconX size={20} color='black'/>
                    </ActionIcon>
                    <Text size='sm'>{filters.nombre}</Text>
                </Group>
            </Paper>
            : null}
        </Group>
    )
}