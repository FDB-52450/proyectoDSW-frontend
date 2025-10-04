import styles from '../StatsPage.module.css'

import dayjs from 'dayjs';

import { useMediaQuery } from '@mantine/hooks';

import { Badge, Grid, Group, Stack, Table, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { AreaChart, DonutChart } from "@mantine/charts";

import { CustomTooltip } from './CustomTooltip/CustomTooltip.tsx';
import { NoDataError } from './NoDataError/NoDataError.tsx';

import { IconArrowBigDownFilled, IconArrowBigUpFilled, IconInfoCircle } from "@tabler/icons-react";

import type { ClienteStatsDTO } from '../../../../entities/stats.ts';

function TableSoldRows({data}: {data: ClienteStatsDTO}) {
    const theme = useMantineTheme()  

    return data.mejoresClientes.slice(0, 5).map((element, idx) => (
        <Table.Tr key={element.id} style={idx === 0 ? {color: theme.colors.yellow[6]} : {}}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td title={element.nombre}>
                <Text size='sm' w='125px' truncate='end'>{element.nombre}</Text>
            </Table.Td>
            <Table.Td style={{ textAlign: 'center' }}>${element.montoTotal.toLocaleString('es-AR')}</Table.Td>
        </Table.Tr>
    ))
}

function getCantClientes(data: ClienteStatsDTO, tipo: 'total' | 'nuevo') {
    const cantidadClientesData = data.cantClientes.map(({numMes, cantNueva, cantAcumulada}) => ({
        month: capitalize(dayjs().month(numMes - 1).format('MMMM')),
        Clientes: tipo === 'total' ? cantAcumulada: cantNueva,
    }))

    return cantidadClientesData
}

function getGeoData(data: ClienteStatsDTO, tipo: 'provincia' | 'ciudad') {
    const dist = tipo === 'provincia' ? data.geoDistDatos.provincias : data.geoDistDatos.ciudades
    type ciudadStructure = {provincia: string; ciudad: string; cantTotal: number}

    const distGeoData = dist.map((data, idx) => ({
        name: tipo === 'provincia' ? data.provincia : `${(data as ciudadStructure).ciudad} (${data.provincia})`,
        value: data.cantTotal,
        color: (data.provincia === '-' || data.provincia === 'Otras') ? 'grey' : `indigo.${7 - idx}`
    }))

    return distGeoData
}

function capitalize(str: string) { 
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function calculateDifference(currentValue: number, lastValue: number) {
    return Number(((currentValue - lastValue) / lastValue) * 100)
}

const tableHeaders = (
    <Table.Tr>
        <Table.Th>ID</Table.Th>
        <Table.Th>Nombre</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Total</Table.Th>
    </Table.Tr>
)

export function ClienteSection({data}: {data: ClienteStatsDTO}) {
    const cantClientes = data.cantClientes

    let clientesNuevosActuales, clientesTotalesActuales
    let clientesNuevosPrev, clientesTotalesPrev
    let clientesNuevosDiff, clientesTotalesDiff

    if (cantClientes.length > 0) {
        clientesNuevosActuales = cantClientes[cantClientes.length - 1].cantNueva
        clientesTotalesActuales = data.cantClientes[data.cantClientes.length - 1].cantAcumulada

        if (cantClientes.length > 1) {
            clientesNuevosPrev = data.cantClientes[data.cantClientes.length - 2].cantNueva
            clientesTotalesPrev = data.cantClientes[data.cantClientes.length - 2].cantAcumulada

            clientesNuevosDiff = calculateDifference(clientesNuevosActuales, clientesNuevosPrev)
            clientesTotalesDiff = calculateDifference(clientesTotalesActuales, clientesTotalesPrev)
        }
    }
  
    const montoTotalProv = data.geoDistDatos.provincias.reduce((sum, item) => sum + item.cantTotal, 0)
    const montoTotalCiudad = data.geoDistDatos.provincias.reduce((sum, item) => sum + item.cantTotal, 0)
    const highestProvincia = data.geoDistDatos.provincias[0].provincia
    const highestCiudad = data.geoDistDatos.ciudades[0].ciudad
    const secondHighestProvincia = data.geoDistDatos.provincias[1]?.provincia ?? '-'
    const secondHighestCiudad = data.geoDistDatos.ciudades[1]?.ciudad ?? '-'
 
    const isTablet = useMediaQuery('(max-width: 768px)')
    const isLaptop = useMediaQuery('(max-width: 1024px)')
    const isLaptopLarge = useMediaQuery('(max-width: 1440px)')

    const spanSize = isTablet ? 6 : isLaptop ? 4 : isLaptopLarge ? 4 : 3

    const dayDiff = dayjs().diff(dayjs().startOf('month'), 'day') + 1

    return (
        <>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} w='100%' className={styles.statsContainer} h='380px'>
                    <Group gap={5}>
                        <Text fw={500} size='md'>Clientes totales</Text>
                        <Tooltip label={`Comparación parcial mensual (desde el 1 hasta el ${dayDiff} de cada mes)`}>
                            <IconInfoCircle size={15} stroke={1.5}></IconInfoCircle>
                        </Tooltip>
                    </Group>
                    {clientesTotalesActuales ? 
                    <>
                        <Text fw={500} size='45px' mb={25}>{clientesTotalesActuales}</Text>
                        <AreaChart h={200} data={getCantClientes(data, 'total')} dataKey="month" series={[{ name: 'Clientes', color: 'green' }]} 
                        curveType='linear' withXAxis={false} withYAxis={false} withDots={false}></AreaChart>
                        <Group justify='flex-end' w='100%' mt={10}>
                            {clientesTotalesDiff ?
                            <Badge leftSection={clientesTotalesDiff > 0 ? <IconArrowBigUpFilled size={10}/> : <IconArrowBigDownFilled size={10}/>} 
                            color={clientesTotalesDiff > 0 ? 'green' : 'red'}> 
                                {clientesTotalesDiff.toFixed(1)}% 
                            </Badge>
                            : null}
                        </Group>
                    </>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Group gap={5}>
                        <Text fw={500} size='md'>Nuevos clientes</Text>
                        <Tooltip label={`Comparación parcial mensual (desde el 1 hasta el ${dayDiff} de cada mes)`}>
                            <IconInfoCircle size={15} stroke={1.5}></IconInfoCircle>
                        </Tooltip>
                    </Group>
                    {clientesNuevosActuales ? 
                    <>
                        <Text fw={500} size='45px' mb={25}>{clientesNuevosActuales}</Text>
                        <AreaChart h={200} data={getCantClientes(data, 'nuevo')} dataKey="month" series={[{ name: 'Clientes', color: 'green' }]} 
                        curveType='linear' withXAxis={false} withYAxis={false} withDots={false}></AreaChart>
                        <Group justify='flex-end' w='100%' mt={10}>
                            {clientesNuevosDiff ?
                            <Badge leftSection={clientesNuevosDiff > 0 ? <IconArrowBigUpFilled size={10}/> : <IconArrowBigDownFilled size={10}/>} 
                            color={clientesNuevosDiff > 0 ? 'green' : 'red'}> 
                                {clientesNuevosDiff.toFixed(1)}% 
                            </Badge>
                            : null}
                        </Group>
                    </>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>                  
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Text fw={500} size='md'>Mejores clientes</Text>
                    {data.mejoresClientes.length > 0 ?
                    <>
                        <Text fw={500} size='40px' mb={25}>{data.mejoresClientes[0].nombre}</Text>
                        <Table>
                            <Table.Thead>{tableHeaders}</Table.Thead>
                            <Table.Tbody>{TableSoldRows({data})}</Table.Tbody>
                        </Table>
                    </>
                    : <NoDataError type='normal'/>}
                </Stack>
            </Grid.Col>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Text fw={500} size='md'>Provincia con mayor ventas</Text>
                    {data.geoDistDatos.provincias.length > 1 ?
                    <Stack justify='space-between' align='center' h='85%'>
                        <Text fw={500} size='30px' mb={25} ta='center'>{highestProvincia != 'Otras' ? highestProvincia : secondHighestProvincia}</Text>
                        <DonutChart withTooltip data={getGeoData(data, 'provincia')} tooltipDataSource="segment" size={200}
                        tooltipProps={{position: {x: 0, y: 210}, 
                        content: ({ payload }) => <CustomTooltip payload={payload} total={montoTotalProv} largeBox={true}/>}}></DonutChart>
                    </Stack>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Text fw={500} size='md'>Ciudad con mayor ventas</Text>
                    {data.geoDistDatos.ciudades.length > 1 ?
                    <Stack justify='space-between' align='center' h='85%'>
                        <Text fw={500} size='30px' mb={25}>{highestCiudad != 'Otras' ? highestCiudad : secondHighestCiudad}</Text>
                        <DonutChart data={getGeoData(data, 'ciudad')} tooltipDataSource="segment" size={200} 
                        tooltipProps={{position: {x: 0, y: 210}, 
                        content: ({ payload }) => <CustomTooltip payload={payload} total={montoTotalCiudad} largeBox={true}/>}}></DonutChart>
                    </Stack>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>
            <Grid.Col span={spanSize}>
                <Group h='100%' w='100%'>
                    <Stack h='100%' w='47%'>
                        <Stack align='center' gap={5} className={styles.statsContainer} h='50%' justify='space-between'>
                            <Stack align='center' gap={5}>
                                <Text fw={500} size='xs' ta='center'>Dia de mayor registro</Text>
                                {data.maxDia.dia != 0 ?
                                <>
                                    <Text fw={550} size='20px' mt={5}>{capitalize(dayjs().day(data.maxDia.dia).format('dddd'))} {data.maxDia.dia} </Text>
                                    <Text fw={550} size='25px' c='green'>{data.maxDia.cant}</Text>
                                </>
                                : <NoDataError type='small'/>}
                            </Stack>
                        </Stack>
                        <Stack align='center' gap={5} className={styles.statsContainer} h='50%' justify='space-between'>
                            <Stack align='center' gap={5}>
                                <Text fw={500} size='xs' ta='center'>Dia de menor registro</Text>
                                {data.minDia.dia != 0 ?
                                <>
                                    <Text fw={550} size='20px' mt={5}>{capitalize(dayjs().day(data.minDia.dia).format('dddd'))} {data.minDia.dia}</Text>
                                    <Text fw={550} size='25px' c='red'>{data.minDia.cant}</Text>
                                </>
                                : <NoDataError type='small'/>}
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack h='100%' w='47%'>
                        <Stack align='center' gap={5} className={styles.statsContainer} h='50%' justify='space-between'>
                            <Stack align='center' gap={8}>
                                <Text fw={500} size='xs' ta='center'>Cantidad de clientes recurrentes</Text>
                                <Tooltip label='Clientes con antiguedad igual o mayor a un mes que realizaron una compra este mes.' multiline w='250px' position='bottom'>
                                    <IconInfoCircle size={15}></IconInfoCircle>
                                </Tooltip>
                                {data.clientesReiterantes > 0 ?
                                <Text fw={550} size='30px' ta='center' mt={20}>{data.clientesReiterantes}</Text>
                                : <NoDataError type='small'/>}
                            </Stack>
                        </Stack>
                        <Stack align='center' gap={5} className={styles.statsContainer} h='50%' justify='space-between'>
                            <Stack align='center' gap={8}>
                                <Text fw={500} size='xs' ta='center'>Antiguedad promedio de cuenta</Text>
                                {data.averageAge > 0 ?
                                <Text fw={550} size='25px' ta='center' mt={20}>{data.averageAge} dias</Text>
                                : <NoDataError type='small'/> }
                            </Stack>
                        </Stack>
                    </Stack>
                </Group>
            </Grid.Col>
        </>
    )
}