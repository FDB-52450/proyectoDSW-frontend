import styles from '../StatsPage.module.css'

import dayjs from 'dayjs';

import { useMediaQuery } from '@mantine/hooks';

import { Badge, Grid, Group, Stack, Table, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { AreaChart, DonutChart } from "@mantine/charts";

import { NoDataError } from './NoDataError/NoDataError.tsx';

import { IconArrowBigDownFilled, IconArrowBigUpFilled, IconInfoCircle } from "@tabler/icons-react";

import type { ProductoStatsDTO } from '../../../../entities/stats.ts';

function getCantVentas(data: ProductoStatsDTO) {
    const montoVentasData = data.cantVendida.map(({yearMes, cantVendida}) => ({
        month: capitalize(dayjs(yearMes).format('MMMM (YYYY)')),
        Ventas: cantVendida,
    }))

    return montoVentasData
}

function getDistData(data: ProductoStatsDTO) {
    const distData = [
        {name: 'Productos sin ventas', value: data.cantNoVendida.cantNoVendida, color: 'indigo'},
        {name: 'Productos con ventas', value: data.cantNoVendida.cantTotal - data.cantNoVendida.cantNoVendida, color: 'cyan'},
    ]

    return distData
}


function TableSoldRows({data, tipo}: {data: ProductoStatsDTO, tipo: 'most' | 'least'}) {
    const theme = useMantineTheme()  
    const dataArray = tipo === 'most' ? data.ventas.slice(0, 5) : data.ventas.slice().reverse().slice(0, 5)
    const color = tipo === 'most' ? theme.colors.yellow[6] : theme.colors.red[7]

    return dataArray.map((element, idx) => (
        <Table.Tr key={element.id} style={idx === 0 ? {color: color} : {}}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td title={element.nombre}>
                <Text size='sm' w='150px' truncate='end'>{element.nombre}</Text>
            </Table.Td>
            <Table.Td style={{ textAlign: 'center' }}>${element.montoTotal.toLocaleString('es-AR')}</Table.Td>
        </Table.Tr>
    ))
}

const tableHeaders = (
    <Table.Tr>
        <Table.Th>ID</Table.Th>
        <Table.Th>Nombre</Table.Th>
        <Table.Th style={{ textAlign: 'center' }}>Monto total</Table.Th>
    </Table.Tr>
)

function capitalize(str: string) { 
    return str.charAt(0).toUpperCase() + str.slice(1)
}


function calculateDifference(currentValue: number, lastValue: number) {
    return Number(((currentValue - lastValue) / lastValue) * 100)
}

export function ProductoSection({data}: {data: ProductoStatsDTO}) {
    const highestProductName = data.ventas[0]?.nombre ?? '-'
    const lowestProductName = data.ventas[data.ventas.length - 1]?.nombre ?? '-'

    const montoTotal = data.cantVendida[data.cantVendida.length - 1]?.cantVendida ?? 0
    const montoTotalPrev = data.cantVendida[data.cantVendida.length - 2]?.cantVendida ?? 0

    const montoTotalDiff = calculateDifference(montoTotal, montoTotalPrev)

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
                        <Text fw={500} size='md'>Productos vendidos</Text>
                        <Tooltip label={`Comparación parcial mensual (desde el 1 hasta el ${dayDiff} de cada mes)`}>
                            <IconInfoCircle size={15} stroke={1.5}></IconInfoCircle>
                        </Tooltip>
                    </Group>
                    {montoTotal > 0 ? 
                    <>
                        <Text fw={500} size='45px' mb={25}>{montoTotal}</Text>
                        <AreaChart h={200} data={getCantVentas(data)} dataKey="month" series={[{ name: 'Ventas', color: 'green' }]} 
                        curveType='linear' withXAxis={false} withYAxis={false} withDots={false}></AreaChart>
                        <Group justify='flex-end' w='100%' mt={10}>
                            <Badge leftSection={montoTotalDiff > 0 ? <IconArrowBigUpFilled size={10}/> : <IconArrowBigDownFilled size={10}/>} 
                            color={montoTotalDiff > 0 ? 'green' : 'red'}> 
                                {montoTotalDiff.toFixed(1)}% 
                            </Badge>
                        </Group>
                    </>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>                      
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Text fw={500} size='md'>Producto mas vendido</Text>
                    {data.ventas.length > 0 ? 
                    <>
                        <Text fw={500} size='30px' mb={25} w='95%' truncate='end' ta='center' title={highestProductName}>{highestProductName}</Text>
                        <Table>
                            <Table.Thead>{tableHeaders}</Table.Thead>
                            <Table.Tbody>
                                <TableSoldRows data={data} tipo={'most'}/>
                            </Table.Tbody>
                        </Table>
                    </>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Text fw={500} size='md' >Producto menos vendido</Text>
                    {data.ventas.length > 0 ? 
                    <>
                        <Text fw={500} size='30px' mb={25} w='95%' truncate='end' ta='center' title={lowestProductName}>{lowestProductName}</Text>
                        <Table>
                            <Table.Thead>{tableHeaders}</Table.Thead>
                            <Table.Tbody>
                                <TableSoldRows data={data} tipo={'least'}/>
                            </Table.Tbody>
                        </Table>
                    </>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={8} className={styles.statsContainer} h='48%' w='48%'>
                    <Text fw={500} size='xs' ta='center'>Productos sin ventas</Text>
                    {data.cantNoVendida.cantNoVendida > 0 ?
                    <>
                        <Text fw={500} size={isTablet ? '20px' : '25px'} mb={5}>{data.cantNoVendida.cantNoVendida}</Text>
                        <DonutChart size={75} data={getDistData(data)} tooltipDataSource="segment" thickness={12}
                        tooltipProps={{position: {x: -65, y: 80}}}>                                
                        </DonutChart>
                    </>
                    : <NoDataError type='small'/>}
                </Stack>
            </Grid.Col>
        </>
    )
}