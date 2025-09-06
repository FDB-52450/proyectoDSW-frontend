import { useState } from 'react'
import { ActionIcon, TextInput, useMantineTheme } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import type { TextInputProps } from '@mantine/core';

import styles from './SearchBar.module.css';

export function SearchBar(props: TextInputProps) {
    const theme = useMantineTheme()
    const [searchQuery, setSearchQuery] = useState('')

    function handleSearch() {
        if (!searchQuery.trim()) return;
    
        window.location.href = `/productos?nombre=${encodeURIComponent(searchQuery)}`;
    }
  
    function handleKeyDown (event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
        handleSearch();
        }
    }

    return (
        <TextInput
            radius="md"
            size="md"
            placeholder="Buscar productos"
            rightSectionWidth={42}
            leftSection={<IconSearch size={18} stroke={1.5} />}
            rightSection={
                <ActionIcon size={30} radius="sm" color={theme.primaryColor} variant="outline"
                className={styles.hoverFilledIcon} onClick={handleSearch}>
                    <IconArrowRight size={18} stroke={1.5} />
                </ActionIcon>
            }
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            styles={{
            input: {
                backgroundColor: 'transparent',
                color: 'white',
            },
        }}
        {...props}
        />
    )
}