import { useMediaQuery } from "@mantine/hooks";

import { Group, ThemeIcon, Stack, Text } from "@mantine/core";

import { IconAlertTriangle, IconBuildingStore, IconCheck, IconShield, IconX } from "@tabler/icons-react";

const stockTypes = [
    {stockMax: 0, icon: <IconX></IconX>, color: 'red', title: 'SIN STOCK', desc: 'No hay stock disponible'},
    {stockMax: 5, icon: <IconAlertTriangle></IconAlertTriangle>, color: 'yellow', title: 'POCO STOCK DISPONIBLE', desc: 'Menos de 5 unidades restantes'},
    {stockMax: Infinity, icon: <IconCheck></IconCheck>, color: 'green', title: 'STOCK DISPONIBLE', desc: '+5 unidades restantes'},
]

export function ItemList({stock}: {stock: number}) {
    let stockType

    for (const stockT of stockTypes) {
        if (stockT.stockMax >= stock) {
            stockType = stockT
            break
        }
    }

    const isSmall = useMediaQuery('(max-width: 400px)')

    if (!stockType) return null

    const iconSize = !isSmall ? 'lg' : 'md'
    const titleSize = !isSmall ? 'md' : 'sm'
    const descSize = !isSmall ? 'sm' : 'xs'

    return (
        <>
            <Group gap={12}>
                <ThemeIcon color={stockType.color} size={iconSize}>
                    {stockType.icon}
                </ThemeIcon>
                <Stack gap={0}>
                    <Text size={titleSize} fw={500} c={stockType.color}>{stockType.title}</Text>
                    <Text size={descSize} mt={-3}>{stockType.desc}</Text>
                </Stack>
            </Group>
            <Group gap={12}>
                <ThemeIcon color='green' size={iconSize}>
                    <IconBuildingStore></IconBuildingStore>
                </ThemeIcon>
                <Stack gap={0}>
                    <Text size={titleSize} fw={500} c='green'>RETIRO GRATIS EN LOCAL</Text>
                    <Text size={descSize} mt={-3}>{isSmall ? 'Zeballos 1341 (Rosario)' : 'Zeballos 1341 (Rosario, Santa Fe)'}</Text>
                </Stack>
            </Group>
            <Group gap={12}>
                <ThemeIcon color='green' size={iconSize}>
                    <IconShield></IconShield>
                </ThemeIcon>
                <Stack gap={0}>
                    <Text size={titleSize} fw={500} c='green'>GARANTIA UNIVERSAL</Text>
                    <Text size={descSize} mt={-3}>{isSmall ? '6 meses' : '6 meses para cualquier producto'}</Text>
                </Stack>
            </Group>
        </>
    )
}