import styles from '../StatsPage.module.css'

import dayjs from 'dayjs';

import { useMediaQuery } from '@mantine/hooks';

import { Badge, Flex, Grid, Group, Stack, Text, Tooltip } from '@mantine/core';
import { AreaChart, DonutChart } from '@mantine/charts';

import { CustomTooltip } from './CustomTooltip/CustomTooltip.tsx';
import { NoDataError } from './NoDataError/NoDataError.tsx';

import { IconArrowBigDownFilled, IconArrowBigUpFilled, IconInfoCircle } from '@tabler/icons-react';

import type { PedidoStatsDTO } from '../../../../entities/stats.ts';

function getCantVentas(data: PedidoStatsDTO) {
    const cantVentasData = [
        {name: 'Confirmado', value: data.cantVentas.cantConfirmado, color: 'green'},
        {name: 'Cancelado', value: data.cantVentas.cantCancelado, color: 'red'},
    ]

    return cantVentasData
}

function getMontoVentas(data: PedidoStatsDTO, tipo: 'confirmado' | 'cancelado', promedio: boolean = false) {
    const ventas = (tipo === 'confirmado' || promedio) ? data.montoVentas.ventasConfirmadas : data.montoVentas.ventasCanceladas

    const montoVentasData = ventas.map(({yearMes, montoTotal, montoAvg}) => ({
        month: capitalize(dayjs(yearMes).format('MMMM (YYYY)')),
        Ventas: promedio ? montoAvg: montoTotal,
    }))

    return montoVentasData
}

function getGeoData(data: PedidoStatsDTO, tipo: 'provincia' | 'ciudad') {
    const dist = tipo === 'provincia' ? data.geoDistDatos.provincias : data.geoDistDatos.ciudades
    type ciudadStructure = {provincia: string; ciudad: string; montoTotal: number}

    const distGeoData = dist.map((data, idx) => ({
        name: tipo === 'provincia' ? data.provincia : `${(data as ciudadStructure).ciudad} (${data.provincia})`,
        value: data.montoTotal,
        color: (data.provincia === '-' || data.provincia === 'Otras') ? 'grey' : `indigo.${7 - idx}`
    }))

    return distGeoData
}

function getDistData(data: PedidoStatsDTO, tipo: 'pago' | 'envio') {
    const dist = tipo === 'pago' ? data.distDatos.distPagos : data.distDatos.distEntregas

    const distData = dist.map((data, idx) => ({
        name: capitalize(data.tipo),
        value: data.cant,
        color: idx === 0 ? 'indigo' : 'cyan'
    }))

    return distData
}


function capitalize(str: string) { 
    return str.charAt(0).toUpperCase() + str.slice(1)
}


function calculateDifference(currentValue: number, lastValue: number) {
    return Number(((currentValue - lastValue) / lastValue) * 100)
}

export function PedidoSection({data}: {data: PedidoStatsDTO}) {
    const montoVentas = data.montoVentas
    const ventasConfLength = montoVentas.ventasConfirmadas.length
    const ventasCancLength = montoVentas.ventasCanceladas.length

    let montoTotalConf, montoTotalCanc, montoTotalAvg
    let montoTotalConfPrev, montoTotalCancPrev, montoTotalAvgPrev
    let montoTotalConfDiff, montoTotalCancDiff, montoTotalAvgDiff

    if (ventasConfLength > 0) {
        montoTotalConf = montoVentas.ventasConfirmadas[ventasConfLength - 1].montoTotal
        montoTotalAvg = montoVentas.ventasConfirmadas[ventasConfLength - 1].montoAvg

        if (ventasConfLength > 1) {
            montoTotalConfPrev = montoVentas.ventasConfirmadas[ventasConfLength - 2].montoTotal
            montoTotalAvgPrev = montoVentas.ventasConfirmadas[ventasConfLength - 2].montoAvg

            montoTotalConfDiff = calculateDifference(montoTotalConf, montoTotalConfPrev)
            montoTotalAvgDiff = calculateDifference(montoTotalAvg, montoTotalAvgPrev)
        }
    }
  
    if (ventasCancLength > 0) {
        montoTotalCanc = montoVentas.ventasCanceladas[ventasCancLength - 1].montoTotal

        if (ventasCancLength > 1) {
            montoTotalCancPrev = montoVentas.ventasCanceladas[ventasCancLength - 2].montoTotal
            montoTotalCancDiff = calculateDifference(montoTotalCanc, montoTotalCancPrev)      
        }
    }

    const montoTotalProv = data.geoDistDatos.provincias.reduce((sum, item) => sum + item.montoTotal, 0)
    const montoTotalCiudad = data.geoDistDatos.provincias.reduce((sum, item) => sum + item.montoTotal, 0)

    const highestProvincia = data.geoDistDatos.provincias[0].provincia
    const highestCiudad = data.geoDistDatos.ciudades[0].ciudad
    const secondHighestProvincia = data.geoDistDatos.provincias[1]?.provincia ?? '-';
    const secondHighestCiudad = data.geoDistDatos.ciudades[1]?.ciudad ?? '-'

    const dayDiff = dayjs().diff(dayjs().startOf('month'), 'day') + 1

    const isTablet = useMediaQuery('(max-width: 768px)')
    const isLaptop = useMediaQuery('(max-width: 1024px)')
    const isLaptopLarge = useMediaQuery('(max-width: 1440px)')

    const spanSize = isTablet ? 6 : isLaptop ? 4 : isLaptopLarge ? 4 : 3
    const flexDirection = isLaptopLarge ? 'row' : 'column'
    const smallTextSize = isLaptop ? '15px' : '20px'

    return (
        <>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} w='100%' className={styles.statsContainer} h='380px'>
                    <Text fw={500} size='md'>Pedidos totales</Text>
                    {data.cantVentas.cantTotal > 0 ?
                    <>
                        <Text fw={500} size='45px' mb={25}>{data.cantVentas.cantTotal}</Text>
                        <DonutChart data={getCantVentas(data)} tooltipDataSource="segment" size={200}
                        tooltipProps={{position: {x: 0, y: 210}, 
                        content: ({ payload }) => <CustomTooltip payload={payload} total={data.cantVentas.cantTotal}/>}}></DonutChart>
                    </>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>                      
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Group gap={5}>
                        <Text fw={500} size='md'>Monto total de ventas</Text>
                        <Tooltip label={`Comparación parcial mensual (desde el 1 hasta el ${dayDiff} de cada mes)`}>
                            <IconInfoCircle size={15} stroke={1.5}></IconInfoCircle>
                        </Tooltip>
                    </Group>
                    {montoTotalConf ?
                    <>
                        <Text fw={500} size='45px' mb={25}>${montoTotalConf.toLocaleString('es-AR')}</Text>
                        <AreaChart h={200} data={getMontoVentas(data, 'confirmado')} dataKey="month" series={[{ name: 'Ventas', color: 'green' }]} 
                        curveType='linear' withXAxis={false} withYAxis={false} withDots={false} valueFormatter={(value) => `$${value.toLocaleString('es-AR')}`}></AreaChart>
                        {montoTotalConfDiff ?
                        <Group justify='flex-end' w='100%' mt={10}>
                            <Badge leftSection={montoTotalConfDiff > 0 ? <IconArrowBigUpFilled size={10}/> : <IconArrowBigDownFilled size={10}/>} 
                            color={montoTotalConfDiff > 0 ? 'green' : 'red'}> 
                                {montoTotalConfDiff.toFixed(1)}% 
                            </Badge>
                        </Group>
                        : null}
                    </>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Group gap={5}>
                        <Text fw={500} size='md'>Monto de ventas canceladas</Text>
                        <Tooltip label={`Comparación parcial mensual (desde el 1 hasta el ${dayDiff} de cada mes)`}>
                            <IconInfoCircle size={15} stroke={1.5}></IconInfoCircle>
                        </Tooltip>
                    </Group>
                    {montoTotalCanc ?
                    <>
                        <Text fw={500} size='45px' mb={25}>${montoTotalCanc.toLocaleString('es-AR')}</Text>
                        <AreaChart h={200} data={getMontoVentas(data, 'cancelado')} dataKey="month" series={[{ name: 'Ventas', color: 'green' }]} 
                        curveType='linear' withXAxis={false} withYAxis={false} withDots={false} valueFormatter={(value) => `$${value.toLocaleString('es-AR')}`}></AreaChart>
                        {montoTotalCancDiff ?
                        <Group justify='flex-end' w='100%' mt={10}>
                            <Badge leftSection={montoTotalCancDiff > 0 ? <IconArrowBigUpFilled size={10}/> : <IconArrowBigDownFilled size={10}/>} 
                            color={montoTotalCancDiff < 0 ? 'green' : 'red'}> 
                                {montoTotalCancDiff.toFixed(1)}% 
                            </Badge>
                        </Group>
                        : null}
                    </>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Group gap={5}>
                        <Text fw={500} size='md'>Monto de venta promedio</Text>
                        <Tooltip label={`Comparación parcial mensual (desde el 1 hasta el ${dayDiff} de cada mes)`}>
                            <IconInfoCircle size={15} stroke={1.5}></IconInfoCircle>
                        </Tooltip>
                    </Group>
                    {montoTotalAvg ?
                    <>
                        <Text fw={500} size='45px' mb={25}>${montoTotalAvg.toLocaleString('es-AR')}</Text>
                        <AreaChart h={200} data={getMontoVentas(data, 'confirmado', true)} dataKey="month" series={[{ name: 'Ventas', color: 'green' }]} 
                        curveType='linear' withXAxis={false} withYAxis={false} withDots={false} valueFormatter={(value) => `$${value.toLocaleString('es-AR')}`}></AreaChart>
                        {montoTotalAvgDiff ?
                        <Group justify='flex-end' w='100%' mt={10}>
                            <Badge leftSection={montoTotalAvgDiff > 0 ? <IconArrowBigUpFilled size={10}/> : <IconArrowBigDownFilled size={10}/>} 
                            color={montoTotalAvgDiff > 0 ? 'green' : 'red'}> 
                                {montoTotalAvgDiff.toFixed(1)}% 
                            </Badge>
                        </Group>
                        : null}
                    </>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Text fw={500} size='md'>Provincia con mayor ventas</Text>
                    {data.geoDistDatos.provincias.length > 1 ?
                    <>
                        <Text fw={500} size='40px' mb={25}>{highestProvincia != 'Otras' ? highestProvincia : secondHighestProvincia}</Text>
                        <DonutChart withTooltip data={getGeoData(data, 'provincia')} tooltipDataSource="segment" size={200}
                        tooltipProps={{position: {x: 0, y: 210}, 
                        content: ({ payload }) => <CustomTooltip payload={payload} total={montoTotalProv} dollarAmount={true}/>}}></DonutChart>
                    </>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Text fw={500} size='md'>Ciudad con mayor ventas</Text>
                    {data.geoDistDatos.ciudades.length > 1 ?
                    <>
                        <Text fw={500} size='40px' mb={25}>{highestCiudad != 'Otras' ? highestCiudad : secondHighestCiudad}</Text>
                        <DonutChart data={getGeoData(data, 'ciudad')} tooltipDataSource="segment" size={200} 
                        tooltipProps={{position: {x: 0, y: 210}, 
                        content: ({ payload }) => <CustomTooltip payload={payload} total={montoTotalCiudad} dollarAmount={true}/>}}></DonutChart>
                    </>
                    : <NoDataError type='normal'/> }
                </Stack>
            </Grid.Col>
            <Grid.Col span={flexDirection === 'column' ? spanSize / 2 : spanSize}>
                <Flex h='100%' direction={flexDirection} gap={15}>
                    <Stack align='center' gap={5} className={styles.statsContainer} justify='space-between'
                    h={flexDirection === 'column' ? '50%' : '100%'} w={flexDirection === 'row' ? '47%' : '100%'}>
                        <Stack align='center' gap={5}>
                            <Text fw={500} size='xs' ta='center'>Dia de mayor ventas</Text>
                            {data.maxDia.dia != 0 ?
                            <>
                                <Text fw={550} size={smallTextSize} mt={10}>{capitalize(dayjs().day(data.maxDia.dia).format('dddd'))} {data.maxDia.dia}</Text>
                                <Text fw={550} size='22px' c='green'>${data.maxDia.monto.toLocaleString('es-AR')}</Text>
                            </>
                            : <NoDataError type='small'/>}
                        </Stack>
                    </Stack>
                    <Stack align='center' gap={5} className={styles.statsContainer} justify='space-between'
                    h={flexDirection === 'column' ? '50%' : '100%'} w={flexDirection === 'row' ? '47%' : '100%'}>
                        <Stack align='center' gap={5}>
                            <Text fw={500} size='xs' ta='center'>Dia de menor ventas</Text>
                            {data.minDia.dia != 0 ?
                            <>
                                <Text fw={550} size={smallTextSize} mt={10}>{capitalize(dayjs().day(data.minDia.dia).format('dddd'))} {data.minDia.dia}</Text>
                                <Text fw={550} size='22px' c='red'>${data.minDia.monto.toLocaleString('es-AR')}</Text>
                            </>
                            : <NoDataError type='small'/>}
                        </Stack>
                    </Stack>
                </Flex>
            </Grid.Col>
            <Grid.Col span={flexDirection === 'column' ? spanSize / 2 : spanSize}>
                <Flex h='100%' direction={flexDirection} gap={15}>
                    <Stack align='center' gap={5} className={styles.statsContainer} justify='space-between'
                    h={flexDirection === 'column' ? '50%' : '100%'} w={flexDirection === 'row' ? '47%' : '100%'}>
                        <Stack align='center' gap={8}>
                            <Text fw={500} size='xs' ta='center'>Tipos de pago</Text>
                            {data.distDatos.distPagos.length > 0 ?
                            <DonutChart size={100} data={getDistData(data, 'pago')} tooltipDataSource="segment" thickness={12}
                            tooltipProps={{position: {x: -50, y: 110}, 
                            content: ({ payload }) => <CustomTooltip payload={payload} total={data.cantVentas.cantConfirmado}/>}}></DonutChart>
                            : <NoDataError type='small'/>}
                        </Stack>
                    </Stack>
                    <Stack align='center' gap={5} className={styles.statsContainer} justify='space-between'
                    h={flexDirection === 'column' ? '50%' : '100%'} w={flexDirection === 'row' ? '47%' : '100%'}>
                        <Stack align='center' gap={8}>
                            <Text fw={500} size='xs' ta='center'>Tipos de entrega</Text>
                            {data.distDatos.distEntregas.length > 0 ?
                            <DonutChart size={100} data={getDistData(data, 'envio')} tooltipDataSource="segment" thickness={12}
                            tooltipProps={{position: {x: -50, y: 110}, 
                            content: ({ payload }) => <CustomTooltip payload={payload} total={data.cantVentas.cantConfirmado}/>}}>                                
                            </DonutChart>
                            : <NoDataError type='small'/>}
                        </Stack>
                    </Stack>
                </Flex>
            </Grid.Col>
        </>
    )
}