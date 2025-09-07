import { useMediaQuery } from "@mantine/hooks";

import { Group, ThemeIcon, Stack, Text } from "@mantine/core";

import { IconAlertTriangle, IconBuildingStore, IconCheck, IconShield, IconX } from "@tabler/icons-react";
import type { Producto } from "../../../entities/producto.ts";

const stockTypes = [
    {stockMax: 0, icon: <IconX></IconX>, color: 'red', title: 'SIN STOCK', desc: 'No hay stock disponible'},
    {stockMax: 5, icon: <IconAlertTriangle></IconAlertTriangle>, color: 'yellow', title: 'POCO STOCK DISPONIBLE', desc: 'Menos de 5 unidades restantes'},
    {stockMax: Infinity, icon: <IconCheck></IconCheck>, color: 'green', title: 'STOCK DISPONIBLE', desc: '+5 unidades restantes'},
]

export function ItemList({prod}: {prod: Producto}) {
    let stockType

    for (const stockT of stockTypes) {
        if (stockT.stockMax >= prod.stockDisponible) {
            stockType = stockT
            break
        }
    }

    const isSmall = useMediaQuery('(max-width: 400px)')

    if (!stockType) return null

    const iconSize = !isSmall ? 'lg' : 'md'
    const titleSize = !isSmall ? 'md' : 'sm'
    const descSize = !isSmall ? 'sm' : 'xs'

    function decapitalize(str: string) {
        if (!str) {
            return ""
        }
        return str.charAt(0).toLowerCase() + str.slice(1)
    }

    return (
        <>
            <Group gap={12}>
                <ThemeIcon color={stockType.color} size={iconSize}>
                    {stockType.icon}
                </ThemeIcon>
                <Stack gap={0}>
                    <Text size={titleSize} fw={600} c={stockType.color}>{stockType.title}</Text>
                    <Text size={descSize} mt={-3}>{stockType.desc}</Text>
                </Stack>
            </Group>
            <Group gap={12}>
                <ThemeIcon color='green' size={iconSize}>
                    <IconBuildingStore></IconBuildingStore>
                </ThemeIcon>
                <Stack gap={0}>
                    <Text size={titleSize} fw={600} c='green'>RETIRO GRATIS EN LOCAL</Text>
                    <Text size={descSize} mt={-3}>{isSmall ? 'Zeballos 1341 (Rosario)' : 'Zeballos 1341 (Rosario, Santa Fe)'}</Text>
                </Stack>
            </Group>
            <Group gap={12}>
                <ThemeIcon color='green' size={iconSize}>
                    <IconShield></IconShield>
                </ThemeIcon>
                <Stack gap={0}>
                    <Text size={titleSize} fw={600} c='green'>GARANTIA</Text>
                    <Text size={descSize} mt={-3}>{isSmall ? `${prod.categoria.duracionGarantia} meses` : `${prod.categoria.duracionGarantia} meses para ${decapitalize(prod.categoria.nombre)}`}</Text>
                </Stack>
            </Group>
        </>
    )
}