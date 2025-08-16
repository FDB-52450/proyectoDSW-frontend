
import styles from './NavigationBar.module.css'

import { Burger, Group, Button, Image, Anchor } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconShoppingCart } from '@tabler/icons-react'

import { SearchBar } from './SearchBar/SearchBar.tsx'
import { DropdownButton } from './DropdownButton/DropdownButton.js'

import logo from '../../../assets/logoPagina.png'

import MotherboardIcon from '../../../assets/icons/motherboard.png'
import GraphicsCardIcon from '../../../assets/icons/graphicCard.png'
import ProcessorIcon from '../../../assets/icons/processor.png'
import RamMemoryIcon from '../../../assets/icons/ram.png'
import DiskMemoryIcon from '../../../assets/icons/hardDisk.png'
import PowerSupplyIcon from '../../../assets/icons/powerSupply.png'
import ComputerCaseIcon from '../../../assets/icons/computerTower.png'
import ComputerFanIcon from '../../../assets/icons/fan.png'

import MouseIcon from '../../../assets/icons/mouse.png'
import KeyboardIcon from '../../../assets/icons/keyboard.png'
import HeadphonesIcon from '../../../assets/icons/headphone.png'
import MicrophoneIcon from '../../../assets/icons/microphone.png'

const componentesData = [
    {
        icon: MotherboardIcon,
        title: 'Motherboards',
        filter: 'placas%20madre'
    },
    {
        icon: GraphicsCardIcon,
        title: 'Tarjetas Graficas',
        filter: 'tarjetas%20graficas',
        subcategorias: [
            { title: 'NVIDIA', filter: 'marca=NVIDIA' },
            { title: 'AMD', filter: 'marca=AMD' }
        ]
    },
    {
        icon: ProcessorIcon,
        title: 'Procesadores',
        filter: 'procesadores',
        subcategorias: [
            { title: 'AMD', filter: 'marca=AMD' },
            { title: 'INTEL', filter: 'marca=INTEL' }
        ]
    },
    {
        icon: RamMemoryIcon,
        title: 'Memorias RAM',
        filter: 'memorias%20ram',
        subcategorias: [
            { title: 'DDR4', filter: 'nombre=DDR4' },
            { title: 'DDR5', filter: 'nombre=DDR4' }
        ]
    },
    {
        icon: DiskMemoryIcon,
        title: 'Almacenamiento',
        filter: 'almacenamiento',
        subcategorias: [
            { title: 'SSD', filter: 'nombre=SSD' },
            { title: 'HDD', filter: 'nombre=HDD' }
        ]
    },
    {
        icon: ComputerCaseIcon,
        title: 'Gabinetes',
        filter: 'gabinetes'
    },
    {
        icon: PowerSupplyIcon,
        title: 'Fuentes de Poder',
        filter: 'fuentes%20de%20poder'
    },
    {
        icon: ComputerFanIcon,
        title: 'Refrigeracion',
        filter: 'refrigeracion'
    },
]

const perifericosData = [
    {
        icon: MouseIcon,
        title: 'Mouse',
        filter: 'mouse'
    },
    {
        icon: KeyboardIcon,
        title: 'Teclados',
        filter: 'teclados'
    },
    {
        icon: HeadphonesIcon,
        title: 'Auriculares',
        filter: 'auriculares',
    },
    {
        icon: MicrophoneIcon,
        title: 'Microfonos',
        filter: 'microfonos'
    }
]


export function NavigationBar() {
    const [opened, { toggle }] = useDisclosure(false)

    return (
        <>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Group wrap='nowrap'>
                        <Burger color='white' opened={opened} onClick={toggle} size="md" hiddenFrom="sm" />
                        <Anchor href="/" rel="noopener noreferrer">
                            <Image src={logo} alt='IMAGEN DE LOGO' h={60} radius='md'></Image>
                        </Anchor>
                    </Group>

                    <Group w={600} className={styles.searchBar} visibleFrom='sm'>
                        <SearchBar
                            placeholder="Buscar productos"
                            style={{ width: '100%' }}
                        />
                    </Group>

                    <Group visibleFrom='sm'>
                        <Button
                        component='a' href='/carrito'
                        variant='default'
                        leftSection={<IconShoppingCart></IconShoppingCart>}
                        className={styles.button}>Carrito</Button>
                    </Group>
                </div>
            </header>
            
            <header className={styles.headerBottom}>
                <div className={styles.innerBottom}>
                    <Group visibleFrom='sm'>
                        <DropdownButton title='Componentes' data={componentesData}></DropdownButton>
                        <DropdownButton title='Perifericos' data={perifericosData}></DropdownButton>
                        <a href="/productos?categoria=monitores" className={styles.linkBottom}>Monitores</a>
                        <a href="/productos?categoria=notebooks" className={styles.linkBottom}>Notebooks</a>
                        <a href="/productos?categoria=computadoras" className={styles.linkBottom}>Computadoras</a>
                    </Group>
                </div>
            </header>
        </>
    )
}