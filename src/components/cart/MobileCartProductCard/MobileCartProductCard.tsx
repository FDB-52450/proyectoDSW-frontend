import classes from './MobileCartProductCard.module.css'

import { Card, Image, Text, Flex, Stack, ActionIcon, Group } from '@mantine/core'

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

export function MobileCartProductCard({pedProd, increment, decrement, remove}: Props) {
    function getProductUrl(prod: Producto) {
        if (prod.imagenes[0]) {
            const imagenUrl = prod.imagenes[0].url
            return `http://localhost:8080/images/${imagenUrl}/medium.webp`
        } else {
            return noImage
        }
    }

    const prod = pedProd.producto

    return (
        <Card p={0} className={classes.card}>
            <Flex gap={0} justify='flex-start' direction='row' w='100%'>
                <Stack p="sm" justify='center'>
                    <Image src={getProductUrl(prod)} style={{maxHeight: 85, maxWidth: 85, objectFit: 'contain'}}/>
                </Stack>

                <Flex justify="space-between" align="center" direction='column' ml={10}>
                    <Stack justify="space-between" align='flex-start'>
                        <Stack gap={1}>
                            <Text c="blue" fw={600} size='xs'> {prod.categoria.nombre.toUpperCase()}
                            </Text>
                            <Text className={classes.title} maw={150} fw={600}> {prod.nombre} </Text>
                        </Stack>

                        <Group gap={5} align='flex-end'>
                            <Text fz="lg" fw={600} style={{ lineHeight: 1 }}>
                                ${prod.precioFinal.toLocaleString("es-AR")}
                            </Text>
                            {prod.descuento == 0 ? null :
                            <Text fz="sm" c="dimmed" fw={300} style={{ lineHeight: 1 }} td="line-through">
                                ${prod.precio.toLocaleString("es-AR")}
                            </Text>
                            }
                        </Group>

                        <Group>
                            <ActionIcon variant="filled" color="red" onClick={remove}>
                                <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                            <Group gap={8}>
                                <ActionIcon variant="filled" color="red" disabled={pedProd.cantidad == 1 ? true: false} onClick={decrement}>
                                    <IconChevronDown style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                                </ActionIcon>
                                <Text style={{ width: 20, textAlign: 'center' }}>
                                    {pedProd.cantidad}
                                </Text>
                                <ActionIcon variant="filled" color="blue" onClick={increment}
                                    disabled={(pedProd.cantidad >= pedProd.producto.categoria.stockLimit || pedProd.cantidad >= pedProd.producto.stockDisponible) ? true: false} >
                                    <IconChevronUp style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                                </ActionIcon>
                            </Group>
                        </Group>
                    </Stack>
                </Flex>
            </Flex>
        </Card>
    )
}

// TODO: Change this so that the default limit (10) is replaced for a per-category limit.