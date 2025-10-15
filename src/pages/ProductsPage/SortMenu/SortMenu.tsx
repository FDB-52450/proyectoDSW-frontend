import styles from './SortMenu.module.css'

import { useState, useEffect } from 'react';

import { Menu, Button, Text } from '@mantine/core';

import { IconCoins, IconArrowNarrowDown, IconArrowNarrowUp, IconStar, IconChevronDown, IconClipboard } from '@tabler/icons-react';

import type { ProductoFilters } from '../../../entities/filters/productoFilters.ts';

interface SortMenuProps {
    filters: ProductoFilters
    updateFilter: (prodFilters: ProductoFilters) => void
}


export function SortMenu({filters, updateFilter}: SortMenuProps) {
    const [localFilters, setLocalFilters] = useState<ProductoFilters>(filters)

    function handleInputChange (value: string) {
        if (value === 'none') {
            setLocalFilters((prev: ProductoFilters) => {
                const { sort: _sort, ...rest } = prev

                void _sort // Prevents not-used variable warning

                return rest
            })
        } else {
            setLocalFilters((prev: ProductoFilters) => ({ ...prev, sort: value}))
        }
    }

    useEffect(() => {
        updateFilter(localFilters);
    }, [localFilters, updateFilter]);

    return (
        <Menu shadow="md" width={225} position='bottom-end' withArrow>
            <Menu.Target>
                <Button className={styles.button} variant='default' rightSection={<IconChevronDown size={18}/>}>Ordenar por</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item leftSection={<IconClipboard size={16}/>}
                onClick={() => handleInputChange('none')}>
                    <Text size='sm' fw={600}>Todos</Text>
                </Menu.Item>
                <Menu.Item leftSection={<IconCoins size={16}/>} rightSection={<IconArrowNarrowDown size={10}/>} 
                onClick={() => handleInputChange('precio-desc')}>
                    <Text size='sm' fw={600}>Precio (DESC)</Text>
                </Menu.Item>
                <Menu.Item leftSection={<IconCoins size={16}/>} rightSection={<IconArrowNarrowUp size={10}/>}
                onClick={() => handleInputChange('precio-asc')}>
                    <Text size='sm' fw={600}>Precio (ASC)</Text>
                </Menu.Item>
                <Menu.Item leftSection={<IconStar size={16}/>} onClick={() => handleInputChange('destacado')}>
                    <Text size='sm' fw={600}>Destacado</Text>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}