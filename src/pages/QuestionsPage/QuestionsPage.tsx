import classes from './QuestionsPage.module.css'

import { useEffect, useState } from 'react'

import { fetchCategorias } from '../../services/categoriaService.ts'

import { Accordion, Container, Text, Group, Table, LoadingOverlay } from '@mantine/core'

import { GenericError } from '../../components/error/GenericError.tsx'

import { IconAlertSquareRounded, IconBan, IconClock, IconCoins, IconPhone, IconShield, IconShoppingCartOff } from '@tabler/icons-react'

import type { Categoria } from '../../entities/categoria.ts'

export function QuestionsPage() {
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)

        fetchCategorias()
        .then((res) => {
            setCategorias(res.data)
        })
        .catch((err) => {
            setError(err.message)
        })
        .finally(() => {
            setLoading(false)
        })

        setError('AAAAA')
    }, [])

    const garantiaRows = categorias.map((c) => (
        <Table.Tr key={c.nombre}>
            <Table.Td>{c.nombre}</Table.Td>
            <Table.Td ta='center'>{c.duracionGarantia} meses</Table.Td>
        </Table.Tr>
    ))
  
    const limiteRows = categorias.map((c) => (
        <Table.Tr key={c.nombre}>
            <Table.Td>{c.nombre}</Table.Td>
            <Table.Td ta='center'>{c.stockLimit} unidades</Table.Td>
        </Table.Tr>
    ))

    if (error) {
        return (
            <GenericError></GenericError>
        )
    }

    return (
        <Container size="sm" className={classes.wrapper}>
            <Text fw={475} size='30px' ta='center' mb={30}>PREGUNTAS FRECUENTES</Text>

            <LoadingOverlay visible={loading}></LoadingOverlay>

            <Accordion variant="separated">
                <Accordion.Item className={classes.item} value='garantia'>
                    <Accordion.Control>
                        <Group gap={10} align='center'>
                            <IconShield/>
                            <Text fw={550} size='lg'>Garantías</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel style={{padding: 10}}>
                        <Text mb={20} style={{ textIndent: '0.5em' }}>
                            Todos nuestros productos incluyen garantía, cuya duración varía según la categoría a la que pertenezca cada producto:
                        </Text>
                        <Table w='60%' withTableBorder m='auto'>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Categoria</Table.Th>
                                    <Table.Th ta='center'>Duracion de garantia</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {garantiaRows}
                            </Table.Tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className={classes.item} value='medios-pago'>
                    <Accordion.Control>
                        <Group gap={10} align='center'>
                            <IconCoins/>
                            <Text fw={550} size='lg'>Medios de pago</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel style={{padding: 10}}>
                        <Text style={{ textIndent: '0.5em' }}>
                            Por el momento, los únicos medios de pago que aceptamos son efectivo y tarjeta de crédito.
                        </Text>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className={classes.item} value='limites-compra'>
                    <Accordion.Control>
                        <Group gap={10} align='center'>
                            <IconAlertSquareRounded/>
                            <Text fw={550} size='lg'>Límites de compras</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel style={{padding: 10}}>
                        <Text style={{ textIndent: '0.5em' }} mb={5}>
                            Cada categoría tiene un límite en la cantidad de productos que se pueden adquirir por compra. 
                            Este limite se basa en la demanda de cada categoría y en el promedio de compra por cliente.
                        </Text>
                        <Text style={{ textIndent: '0.5em' }} mb={20}>
                            La implementacion de esta medida tiene el objetivo de garantizar que todos los clientes tengan acceso a los productos disponibles. 
                            Si desea realizar una compra en grandes cantidades, por favor comuníquese con la administración del local.
                        </Text>
                        <Table w='60%' withTableBorder m='auto'>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Categoria</Table.Th>
                                    <Table.Th ta='center'>Limite de unidades</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {limiteRows}
                            </Table.Tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className={classes.item} value='cancelacion-compras'>
                    <Accordion.Control>
                        <Group gap={10} align='center'>
                            <IconShoppingCartOff/>
                            <Text fw={550} size='lg'>Cancelacion de compras</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel style={{padding: 10}}>
                        <Text style={{ textIndent: '0.5em' }}>
                            Por el momento, la página web no cuenta con la funcionalidad para que los clientes cancelen sus órdenes de compra de forma directa.
                            Por lo tanto, si desea cancelar una orden, deberá comunicarse con la administración del local, 
                            proporcionando su DNI y el número de la orden correspondiente.
                        </Text>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className={classes.item} value='bloqueo-cuentas'>
                    <Accordion.Control>
                        <Group gap={10} align='center'>
                            <IconBan/>
                            <Text fw={550} size='lg'>Bloqueo de cuentas</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel style={{padding: 10}}>
                        <Text style={{ textIndent: '0.5em' }}>
                            Si un cliente incumple con varias órdenes de compra, su cuenta podrá ser bloqueada.
                            La duración del bloqueo dependerá de la cantidad de órdenes canceladas y del monto total involucrado, 
                            pudiendo ser permanente si la infracción es considerada grave.
                        </Text>
                        <Text style={{ textIndent: '0.5em' }}>
                            Si cree que su cuenta ha sido bloqueada por error, por favor comuníquese con la administración del local.
                        </Text>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className={classes.item} value='horarios'>
                    <Accordion.Control>
                        <Group gap={10} align='center'>
                            <IconClock/>
                            <Text fw={550} size='lg'>Horarios de atencion</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel style={{padding: 10}}>
                        <Text style={{ textIndent: '0.5em' }}>
                            Nuestros horarios de atención son:
                        </Text>
                        <Text style={{ textIndent: '0.5em' }}>• De lunes a viernes, de 9:00 a 17:00 horas.</Text>
                        <Text style={{ textIndent: '0.5em' }}>• Sábados, de 9:00 a 13:00 horas (cerrado los domingos).</Text>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item className={classes.item} value='contacto'>
                    <Accordion.Control>
                        <Group gap={10} align='center'>
                            <IconPhone/>
                            <Text fw={550} size='lg'>Contacto</Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel style={{padding: 10}}>
                        <Text style={{ textIndent: '0.5em' }}>
                            Si desea comunicarse con la administración del local para resolver algún problema o para cualquier otra consulta no especificada en esta página,
                            deberá hacerlo a través de WhatsApp al teléfono proporcionado al final de la página (+54 9 432 4631-6492) 
                            o mediante el correo electrónico que encontrará en la misma sección (soporte@technexus.com.ar).
                        </Text>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>

            <Text ta='center' size='md' mt={50} c="dimmed">Última actualización:</Text>
            <Text ta='center' size='sm' c="dimmed">10 de octubre, 2025</Text>
        </Container>
    );
}