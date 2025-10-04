import styles from './StatsPage.module.css'

import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

import { fetchStats } from '../../../services/statsService.ts';

import { Box, Center, Grid, Group, Loader, SegmentedControl, Stack, Text } from "@mantine/core"

import { PedidoSection } from './StatsSections/PedidoSection.tsx';
import { CategoriaSection } from './StatsSections/CategoriaSection.tsx';
import { ProductoSection } from './StatsSections/ProductoSection.tsx';
import { MarcaSection } from './StatsSections/MarcaSection.tsx';
import { ClienteSection } from './StatsSections/ClienteSection.tsx';

import { IconCategory, IconChartBar, IconExclamationCircle, IconPackage, IconRegistered, IconShoppingCart, IconUser } from '@tabler/icons-react';

import type { CategoriaStatsDTO, ClienteStatsDTO, MarcaStatsDTO, PedidoStatsDTO, ProductoStatsDTO } from '../../../entities/stats.ts';

const controlData = [
    {
        value: 'pedidos',
        label: (
        <Center style={{ gap: 10 }}>
            <IconShoppingCart size={20} />
            <span>Pedidos</span>
        </Center>
        ),
    },
    {
        value: 'productos',
        label: (
        <Center style={{ gap: 10 }}>
            <IconPackage size={20} />
            <span>Productos</span>
        </Center>
        ),
    },
    {
        value: 'categorias',
        label: (
        <Center style={{ gap: 10 }}>
            <IconCategory size={20} />
            <span>Categorias</span>
        </Center>
        ),
    },
        {
        value: 'marcas',
        label: (
        <Center style={{ gap: 10 }}>
            <IconRegistered size={20} />
            <span>Marcas</span>
        </Center>
        ),
    },
        {
        value: 'clientes',
        label: (
        <Center style={{ gap: 10 }}>
            <IconUser size={20} />
            <span>Clientes</span>
        </Center>
        ),
    },
]

type StatKey = 'pedidos' | 'productos' | 'clientes' | 'categorias' | 'marcas'

export function MainPage() {
    const [statType, setStatType] = useState<StatKey>('pedidos')
    const [currentType, setCurrentType] = useState<StatKey | null>(null)

    const [data, setData] = useState<PedidoStatsDTO | ProductoStatsDTO | MarcaStatsDTO | CategoriaStatsDTO | ClienteStatsDTO | null>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const statComponent = {
        pedidos: <PedidoSection data={data as PedidoStatsDTO}></PedidoSection>,
        productos: <ProductoSection data={data as ProductoStatsDTO}></ProductoSection>,
        clientes: <ClienteSection data={data as ClienteStatsDTO}></ClienteSection>,
        categorias: <CategoriaSection data={data as CategoriaStatsDTO}></CategoriaSection>,
        marcas: <MarcaSection data={data as MarcaStatsDTO}></MarcaSection>
    }

    useEffect(() => {
        setLoading(true)
        setError(null)
        setData(null)
        setCurrentType(null)

        fetchStats(statType)
        .then((res) => {
            setData(res)
            setCurrentType(statType)
        })
        .catch((err) => {
            setError(err.message)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [statType])
  
    const isTablet = useMediaQuery('(max-width: 768px)')
    const isLaptop = useMediaQuery('(max-width: 1024px)')
    const isLaptopLarge = useMediaQuery('(max-width: 1440px)')

    const segmentControlSize = isTablet ? 'sm' : isLaptop ? 'md' : isLaptopLarge ? 'md' : 'lg'
    const segmentControlLength = isTablet ? '90%' : isLaptop ? '75%' : isLaptopLarge ? '70%' : '60%'

    return (
        <Box w='100%'>
            <Stack m={25} p={30}>
                <Group className={styles.statsContainer}> 
                    <IconChartBar size={45}></IconChartBar> 
                    <Text size='35px' fw={550}>ESTADISTICAS MENSUALES</Text>
                </Group>
                <SegmentedControl value={statType} onChange={(value) => setStatType(value as StatKey)} data={controlData} size={segmentControlSize} 
                w={segmentControlLength}></SegmentedControl>
                <Stack>
                    {loading ?
                    <Center w='100%'>
                        <Loader size={125} mt={100}></Loader>
                    </Center> 
                    : null}
                    {error ? 
                    <Stack w='100%' align='center' gap={5} mt={100}>
                        <IconExclamationCircle size={50}></IconExclamationCircle>
                        <Text size='xl'>Ha occurido un error, intente de nuevo mas tarde.</Text>
                    </Stack> 
                    : null}
                    <Grid>
                        {!loading && !error && currentType === statType ? statComponent[statType] : null}
                    </Grid>
                </Stack>
            </Stack>
        </Box>
    )
}