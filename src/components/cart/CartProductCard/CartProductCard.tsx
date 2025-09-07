import classes from './CartProductCard.module.css'

import { Card, Image, Text, Flex, Stack, ActionIcon, Group, Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import noImage from '../../../assets/noImage.png'
import { IconTrash, IconChevronDown, IconChevronUp } from '@tabler/icons-react'

import type { PedidoProd } from '../../../entities/pedidoProd.ts'
import type { Producto } from '../../../entities/producto.ts'

interface Props {
    pedProd: PedidoProd;
    increment: () => void;
    decrement: () => void;
    remove: () => void;
}

export function CartProductCard({pedProd, increment, decrement, remove}: Props) {
    function getProductUrl(prod: Producto) {
        if (prod.imagenes[0]) {
            const imagenUrl = prod.imagenes[0].url
            return `http://localhost:8080/images/${imagenUrl}/medium.webp`
        } else {
            return noImage
        }
    }

    const prod = pedProd.producto
    const isMobile = useMediaQuery('(max-width: 768px)')

    return (
        <Card p={0} className={classes.card} h={isMobile ? 150 : 175}>
            <Box p="sm" style={{ display: 'flex', justifyContent: 'center' }} w={175}>
                <Image src={getProductUrl(prod)} style={{maxHeight: 150, maxWidth: 150, objectFit: 'contain'}}/>
            </Box>

            <Flex justify="space-between" align="center" w="100%" ml={15}>
                <Stack h='80%' justify="space-between">
                    <Stack gap={1}>
                        <Text c="blue" fw={600} size='xs'> {prod.categoria.nombre.toUpperCase()}
                        </Text>
                        <Text fw={600}> {prod.nombre} </Text>
                    </Stack>
                    <Group>
                        <ActionIcon variant="filled" color="red" onClick={remove}>
                            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        <Group>
                            <ActionIcon variant="filled" color="red" disabled={pedProd.cantidad == 1 ? true: false} onClick={decrement}>
                                <IconChevronDown style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                            </ActionIcon>
                            <Text style={{ width: 20, textAlign: 'center' }}>
                                {pedProd.cantidad}
                            </Text>
                            <ActionIcon variant="filled" color="blue" onClick={increment}
                                disabled={(pedProd.cantidad >= 10 || pedProd.cantidad >= pedProd.producto.stockDisponible) ? true: false} >
                                <IconChevronUp style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                            </ActionIcon>
                        </Group>
                    </Group>
                </Stack>

                <Stack gap={5} mr={10} align='flex-end'>
                    {prod.descuento == 0 ? '' :
                    <Text fz="sm" c="dimmed" fw={300} style={{ lineHeight: 1 }} td="line-through">
                        ${prod.precio.toLocaleString("es-AR")}
                    </Text>
                    }
                    <Text fz="xl" fw={600} style={{ lineHeight: 1 }}>
                        ${prod.precioFinal.toLocaleString("es-AR")}
                    </Text>
                </Stack>
            </Flex>
        </Card>
    )
}

// TODO: Change this so that the default limit (10) is replaced for a per-category limit.