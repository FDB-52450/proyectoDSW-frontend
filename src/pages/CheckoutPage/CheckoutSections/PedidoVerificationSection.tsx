import styles from '../CheckoutPage.module.css'

import dayjs from 'dayjs';

import { Divider, Flex, Group, Stack, Text } from "@mantine/core";

import { PedidoResume } from "../PedidoResume/PedidoResume.tsx";

import type { UseFormReturnType } from '@mantine/form';
import type { FormInterface } from '../CheckoutPage.tsx';
import type { PedidoProd } from '../../../entities/pedidoProd.ts';
import { useMediaQuery } from '@mantine/hooks';

export function PedidoVerificationSection({form, cart}: {form: UseFormReturnType<FormInterface>, cart: PedidoProd[]}) {
    const formValues = form.getValues()
    const cliente = formValues.cliente

    function capitalize (str: string) { 
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
  
    const isMobile = useMediaQuery('(max-width: 768px)')

    const containerWidth = isMobile ? '100%' : '40%'
    const containerWidthB = isMobile ? '100%' : '50%'
    
    return (
        <Flex w='100%' gap={25} p={20} justify='center' direction={isMobile ? 'column' : 'row'}>
            <Stack w={containerWidth} justify='flex-start' gap={25}>
                <Stack className={styles.mainContainer}>
                    <Group justify='center' mb={-5}>
                        <Text size='lg' fw={600}>DATOS PERSONALES</Text>
                    </Group>

                    <Divider></Divider>

                    <Stack>
                        <Stack gap={5}>
                            <Text fw={500} size='md' mb={2}>Nombre Completo</Text>
                            <Text size='sm' mb={2}>{cliente.apellido}, {cliente.nombre}</Text>
                        </Stack>
                        <Stack gap={5}>
                            <Text fw={500} size='md' mb={2}>Telefono</Text>
                            <Text size='sm' mb={2}>{cliente.telefono}</Text>
                        </Stack>
                        <Stack gap={5}>
                            <Text fw={500} size='md' mb={2}>Email</Text>
                            <Text size='sm' mb={2}>{cliente.email}</Text>
                        </Stack>
                        <Stack gap={5}>
                            <Text fw={500} size='md' mb={2}>Direccion</Text>
                            <Text size='sm' mb={2}>{cliente.direccion} ({cliente.provincia}, {cliente.ciudad} {cliente.codigoPostal})</Text>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack className={styles.mainContainer}>
                    <Group justify='center' mb={-5}>
                        <Text size='lg' fw={600}>DATOS DEL PEDIDO</Text>
                    </Group>

                    <Divider></Divider>
                    <Stack>
                        <Stack gap={5}>
                            <Text fw={500} size='md' mb={2}>Tipo de pago</Text>
                            <Text size='sm' mb={2}>{capitalize(formValues.tipoPago)}</Text>
                        </Stack>
                        <Stack gap={5}>
                            <Text fw={500} size='md' mb={2}>Tipo de entrega</Text>
                            <Text size='sm' mb={2}>{capitalize(formValues.tipoEntrega)}</Text>
                        </Stack>
                        <Stack gap={5}>
                            <Text fw={500} size='md' mb={2}>Fecha de entrega</Text>
                            <Text size='sm' mb={2}>{dayjs(formValues.fechaEntrega).format('DD/MM/YYYY')}</Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack w={containerWidthB} className={styles.mainContainer} h='100%'>
                <PedidoResume cart={cart}></PedidoResume>
            </Stack>
        </Flex>
    )
}