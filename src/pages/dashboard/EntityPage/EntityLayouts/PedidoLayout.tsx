import dayjs from 'dayjs'

import { Grid, Flex, Text, useMantineTheme, SegmentedControl, Center, Stack, Group, Divider, Tooltip, Select} from "@mantine/core"

import { DateInput } from '@mantine/dates';

import { IconCheck, IconClock, IconX } from '@tabler/icons-react'

import type { UseFormReturnType } from "@mantine/form"
import type { PedidoFormValues } from '../formData/formTypes.ts'

export function PedidoLayout({form, isEditable}: {form: UseFormReturnType<PedidoFormValues>, isEditable: boolean}) {
    const theme = useMantineTheme()

    const estadoData = [
        {
            value: 'pendiente',
            label: (
                <Center style={{ gap: 10 }}>
                    <IconClock size={16}/>
                    <Text size='sm'>Pendiente</Text>
                </Center>
            ),
            disabled: true,
        },
        {
            value: 'confirmado',
            label: (
                <Center style={{ gap: 10 }}>
                    <IconCheck size={16} color='green'/>
                    <Text size='sm'>Confirmado</Text>
                </Center>
            ),
        },
        {
            value: 'cancelado',
            label: (
                <Center style={{ gap: 10 }}>
                    <IconX size={16} color='red'/>
                    <Text size='sm'>Cancelado</Text>
                </Center>
            ),
        },
    ]

    return (
        <>
            <form>
                <Grid w='100%' mt={30}>
                    <Grid.Col span={3}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>TIPO DE ENVIO (*)</Text>
                            <Select radius="md" readOnly={!isEditable} data={[{ value: 'retiro', label: 'Retiro' }, { value: 'envio', label: 'Envio' }]} 
                            {...form.getInputProps('tipoEntrega')} styles={{input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>TIPO DE PAGO (*)</Text>
                            <Select radius="md" readOnly={!isEditable} data={[{ value: 'efectivo', label: 'Efectivo' }, { value: 'credito', label: 'Credito' }]} 
                            {...form.getInputProps('tipoPago')} styles={{input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3} h={85}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>FECHA DE ENTREGA (*)</Text>
                            <DateInput radius="md" readOnly={!isEditable} valueFormat="DD/MM/YYYY" minDate={dayjs().subtract(3, 'days').format('YYYY-MM-DD')}
                            maxDate={dayjs().add(1, 'month').format('YYYY-MM-DD')} excludeDate={(date) => new Date(date).getDay() === 6} 
                            {...form.getInputProps('fechaEntrega')}
                            styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={4}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>ESTADO (*)</Text>
                            <Tooltip label='El estado solo puede modificarse si el pedido está pendiente.'>
                                <SegmentedControl readOnly={!isEditable || form.values.estado != 'pendiente'} data={estadoData} {...form.getInputProps('estado')}
                                styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                            </Tooltip>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={4}/>
                    
                    <Grid.Col span={6}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>DETALLE</Text>
                            <Tooltip label='El detalle no puede modificarse.'>
                                <Stack w='60%' gap={5} p={10} style={{ backgroundColor: theme.colors.gray[1], borderRadius: '8px'}}>
                                    <Group justify='space-between' gap={5}>
                                        <Group>
                                            <Text size='sm' fw={600}>ID</Text>
                                            <Text size='sm' fw={600}>NOMBRE</Text>
                                        </Group>
                                        <Text size='sm' fw={600}>CANTIDAD</Text>
                                    </Group>
                                    <Divider></Divider>
                                    {form.values.detalle ? form.values.detalle.map((item, idx) => (
                                        <Group justify='space-between' gap={5} key={idx}>
                                            <Group w='80%'>
                                                <Text size='xs' w='7%'>[{item.producto.id}]</Text>
                                                <Text size='sm'>{item.producto.nombre}</Text>
                                            </Group>
                                            <Text size='sm' mr={25}>x{item.cantidad}</Text>
                                        </Group>
                                    )) : null}
                                </Stack>
                            </Tooltip>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </form>
        </>
    )
}