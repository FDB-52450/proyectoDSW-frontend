import styles from '../StatsPage.module.css'

import { useMediaQuery } from '@mantine/hooks'

import { Grid, Stack, Table, Text, useMantineTheme } from "@mantine/core"

import { NoDataError } from './NoDataError/NoDataError.tsx'

import type { CategoriaStatsDTO } from '../../../../entities/stats.ts'

function TableSoldRows({data, tipo}: {data: CategoriaStatsDTO, tipo: 'most' | 'least'}) {
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
        <Table.Th style={{ textAlign: 'center' }}>Unidades</Table.Th>
    </Table.Tr>
)

export function CategoriaSection({data}: {data: CategoriaStatsDTO}) {  
    const highestCategoriaName = data.ventas?.[0]?.nombre ?? '-'
    const lowestCategoriaName = data.ventas?.[data.ventas.length - 1]?.nombre ?? '-'

    const isTablet = useMediaQuery('(max-width: 768px)')
    const isLaptop = useMediaQuery('(max-width: 1024px)')
    const isLaptopLarge = useMediaQuery('(max-width: 1440px)')

    const spanSize = isTablet ? 6 : isLaptop ? 4.5 : isLaptopLarge ? 4 : 3
    const smallTextSize = isTablet ? 'xs' : isLaptop ? 'sm' : isLaptopLarge ? 'sm' : 'md'
    const bigTextSize = isTablet ? '25px' : isLaptop ? '28px' : isLaptopLarge ? '30px' : '35px'

    return (
        <>
            <Grid.Col span={spanSize}>
                <Stack align='center' gap={5} className={styles.statsContainer} h='380px'>
                    <Text fw={500} size={smallTextSize}>Categoria mas vendida</Text>
                    {data.ventas.length > 0 ? 
                    <>
                        <Text fw={500} size={bigTextSize} mb={25} ta='center'>{highestCategoriaName}</Text>
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
                    <Text fw={500} size={smallTextSize}>Categoria menos vendida</Text>
                    {data.ventas.length > 0 ? 
                    <>
                        <Text fw={500} size={bigTextSize} mb={25} ta='center'>{lowestCategoriaName}</Text>
                        <Table>
                            <Table.Thead>{tableHeaders}</Table.Thead>
                            <Table.Tbody>
                                <TableSoldRows data={data} tipo={'most'}/>
                            </Table.Tbody>
                        </Table>
                    </>
                    : <NoDataError type='normal'/>}
                </Stack>
            </Grid.Col>
        </>
    )
}