import styles from '../CheckoutPage.module.css'

import dayjs from 'dayjs';

import { Divider, Flex, Group, Stack, Text } from "@mantine/core";

import { IconCalendarClock, IconCoin, IconCreditCard, IconLabel, IconTruck } from "@tabler/icons-react";

import type { Pedido } from "../../../entities/pedido.ts";
import { useMediaQuery } from '@mantine/hooks';

export function PedidoCompletedSection({createdPedido}: {createdPedido: Pedido | undefined}) {   
    const isMobile = useMediaQuery('(max-width: 500px)')
    const isLaptop = useMediaQuery('(max-width: 1024px)')

    if (!createdPedido) return null

    const containerSize = isMobile ? '100%' : (isLaptop ? '70%' : '40%')

    return (
        <Stack w={containerSize} className={styles.mainContainer} align='center' m='auto' gap={25} p={20} mt={20}>
            <Text size='lg' fw={600} mb={-5} ta='center'>TU PEDIDO HA SIDO RECIBIDO CON EXITO!</Text>

            <Divider w='100%'></Divider>

            <Group>
                <Flex w='100%' justify='space-between' direction={isMobile ? 'column' : 'row'}>
                    <Group gap={5}>
                        <IconLabel size={25}/>
                        <Text size='md' fw={550}> Numero de pedido:</Text>
                    </Group>
                    <Text>[{createdPedido? createdPedido.id : '0000'}]</Text>
                </Flex>
                <Flex w='100%' justify='space-between' direction={isMobile ? 'column' : 'row'}>
                    <Group gap={5}>
                        <IconCreditCard size={25}/>
                        <Text size='md' fw={550}> Tipo de pago:</Text>
                    </Group>
                    <Text>{createdPedido? createdPedido.tipoPago.toUpperCase() : 'RETIRO'}</Text>
                </Flex>
                <Flex w='100%' justify='space-between' direction={isMobile ? 'column' : 'row'}>
                    <Group gap={5}>
                        <IconTruck size={25}/>
                        <Text size='md' fw={550}> Tipo de entrega:</Text>
                    </Group>
                    <Text>{createdPedido? createdPedido.tipoEntrega.toUpperCase() : 'EFECTIVO'}</Text>
                </Flex>
                <Flex w='100%' justify='space-between' direction={isMobile ? 'column' : 'row'}>
                    <Group gap={5}>
                        <IconCalendarClock size={25}/>
                        <Text size='md' fw={550}> Fecha de entrega:</Text>
                    </Group>
                    <Text>{createdPedido? dayjs(createdPedido.fechaEntrega).format('D [de] MMMM, YYYY') : '1 de enero, 2025'}</Text>
                </Flex>
                <Flex w='100%' justify='space-between' direction={isMobile ? 'column' : 'row'}>
                    <Group gap={5}>
                        <IconCoin size={25}/>
                        <Text size='md' fw={550}> Total:</Text>
                    </Group>
                    <Text>${createdPedido? createdPedido.precioTotal.toLocaleString('es-AR') : '00.000.000'}</Text>
                </Flex>
            </Group>
        </Stack>
    )
}