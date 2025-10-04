import { useState, useEffect } from 'react';

import { Menu, Button } from '@mantine/core';

import { IconCoins, IconArrowNarrowDown, IconArrowNarrowUp, IconStar } from '@tabler/icons-react';

import type { ProductoFilters } from '../../../../entities/filters/productoFilters.ts';

interface SortMenuProps {
    filters: ProductoFilters
    updateFilter: (prodFilters: ProductoFilters) => void
}


export function SortMenu({filters, updateFilter}: SortMenuProps) {
    const [localFilters, setLocalFilters] = useState<ProductoFilters>(filters)

    function handleInputChange (value: string) {
        setLocalFilters((prev: ProductoFilters) => ({ ...prev, sort: value}))
    }

    useEffect(() => {
        updateFilter(localFilters);
    }, [localFilters, updateFilter]);

    return (
        <Menu shadow="md" width={225} position='bottom-end' withArrow>
            <Menu.Target>
                <Button>Ordenar por...</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item leftSection={<IconCoins size={16}/>} rightSection={<IconArrowNarrowDown size={10}/>} 
                onClick={() => handleInputChange('precio-desc')}>
                    Precio (DESC)
                </Menu.Item>
                <Menu.Item leftSection={<IconCoins size={16}/>} rightSection={<IconArrowNarrowUp size={10}/>}
                onClick={() => handleInputChange('precio-asc')}>
                    Precio (ASC)
                </Menu.Item>
                <Menu.Item leftSection={<IconStar size={16}/>} onClick={() => handleInputChange('destacado')}>
                    Destacado
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}