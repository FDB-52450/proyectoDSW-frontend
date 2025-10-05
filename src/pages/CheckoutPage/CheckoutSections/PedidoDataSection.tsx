import styles from '../CheckoutPage.module.css'

import dayjs from 'dayjs';

import { Card, Divider, Group, Radio, Stack, Text, useMantineTheme } from "@mantine/core";
import { DateInput } from '@mantine/dates';

import type { UseFormReturnType } from "@mantine/form";
import type { FormInterface } from "../CheckoutPage.tsx";
import { useMediaQuery } from '@mantine/hooks';

export function PedidoDataSection({form}: {form: UseFormReturnType<FormInterface>}) {
    const theme = useMantineTheme()

    const isMobile = useMediaQuery('(max-width: 768px)')
    const isLaptop = useMediaQuery('(max-width: 1024px)')

    const containerWidth = isMobile ? '100%' : (isLaptop ? '85%' : '70%')

    return (
        <Stack w={containerWidth} m='auto' className={styles.mainContainer} gap={25} p={20}>
            <Group justify='center' mb={-5}>
                <Text size='30px' fw={600} ta='center'>DATOS DE PEDIDO</Text>
            </Group>

            <Divider></Divider>

            <Card withBorder radius="md" padding="md" style={{borderLeft: '4px solid var(--mantine-color-blue-6)', backgroundColor: 'var(--mantine-color-body)'}}>
                <Group>
                    <Radio.Group name="tipoPago" label="TIPO DE PAGO" description="Seleccionar tipo de pago" {...form.getInputProps('tipoPago')}>
                        <Group mt="xs">
                            <Radio value="efectivo" label="EFECTIVO" />
                            <Radio value="credito" label="CREDITO" />
                        </Group>
                    </Radio.Group>
                </Group>
            </Card>

            <Card withBorder radius="md" padding="md" 
            style={{borderLeft: '4px solid var(--mantine-color-blue-6)', backgroundColor: 'var(--mantine-color-body)'}}>
                <Radio.Group name="tipoEntrega" label="TIPO DE ENTREGA" description="Seleccionar tipo de entrega" {...form.getInputProps('tipoEntrega')}>
                    <Group mt="xs">
                        <Radio value="retiro" label="RETIRO" />
                        <Radio value="envio" label="ENVIO" />
                    </Group>
                </Radio.Group>
            </Card>

            <Card withBorder radius="md" padding="md" 
            style={{borderLeft: '4px solid var(--mantine-color-blue-6)', backgroundColor: 'var(--mantine-color-body)'}}>
                <Text fw={500} size='sm' mb={2}>FECHA DE ENTREGA</Text>
                <Text size='xs' c={theme.colors.gray[6]} mb={4}>Seleccionar fecha de entrega (o usar la que esta por defecto)</Text>
                <DateInput valueFormat="DD/MM/YYYY" minDate={dayjs().add(7, 'days').startOf('day').toDate()} w={125}
                maxDate={dayjs().add(21, 'days').startOf('day').toDate()} excludeDate={(date) => new Date(date).getDay() === 6} 
                {...form.getInputProps('fechaEntrega')}/>
            </Card>
        </Stack>
    )
}