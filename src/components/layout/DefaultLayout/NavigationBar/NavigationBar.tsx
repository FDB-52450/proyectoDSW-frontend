
import styles from './NavigationBar.module.css'

import { Group, Button, Image, Anchor, Text } from '@mantine/core'
import { IconDoor, IconShoppingCart, IconTools } from '@tabler/icons-react'

import { SearchBar } from './SearchBar/SearchBar.tsx'
import { DropdownButton } from './DropdownButton/DropdownButton.js'
import { BurgerMenu } from './MobileMenu/MobileMenu.tsx'

import logo from '../../../../assets/logoPagina.png'

import MotherboardIcon from '../../../../assets/icons/motherboard.png'
import GraphicsCardIcon from '../../../../assets/icons/graphicCard.png'
import ProcessorIcon from '../../../../assets/icons/processor.png'
import RamMemoryIcon from '../../../../assets/icons/ram.png'
import DiskMemoryIcon from '../../../../assets/icons/hardDisk.png'
import PowerSupplyIcon from '../../../../assets/icons/powerSupply.png'
import ComputerCaseIcon from '../../../../assets/icons/computerTower.png'
import ComputerFanIcon from '../../../../assets/icons/fan.png'

import MouseIcon from '../../../../assets/icons/mouse.png'
import KeyboardIcon from '../../../../assets/icons/keyboard.png'
import HeadphonesIcon from '../../../../assets/icons/headphone.png'
import MicrophoneIcon from '../../../../assets/icons/microphone.png'

import type { User } from '../../../../entities/user.ts'
import { Link } from 'react-router-dom'

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


export function NavigationBar({user}: {user: User | null}) {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Group wrap='nowrap'>
                        <BurgerMenu></BurgerMenu>
                        <Anchor href="/" rel="noopener noreferrer">
                            <Image src={logo} alt='IMAGEN DE LOGO' h={60} radius='md'></Image>
                        </Anchor>
                    </Group>

                    <Group w={'40vw'} className={styles.searchBar} visibleFrom='md'>
                        <SearchBar style={{ width: '100%' }}/>
                    </Group>

                    <Group>
                        {user ? 
                        <Button component={Link} to='/dashboard' className={styles.button} visibleFrom='xs'>
                            <Group gap={5}>
                                <IconTools/>
                                <Text fw={550}>DASHBOARD</Text>
                            </Group>
                        </Button>
                        :
                        <Button component={Link} to='/login' className={styles.button} visibleFrom='xs'>
                            <Group gap={5}>
                                <IconDoor/>
                                <Text fw={550}>INGRESAR</Text>
                            </Group>
                        </Button>
                        }
                        <Button component='a' href='/carrito' variant='default' className={styles.button}>
                            <Group gap={5}>
                                <IconShoppingCart/>
                                <Text fw={550} visibleFrom='xs'>CARRITO</Text>
                            </Group>
                        </Button>
                    </Group>
                </div>
            </header>
            
            <header className={styles.headerBottom}>
                <div className={styles.innerBottom}>
                    <Group visibleFrom='xs'>
                        <DropdownButton title='Componentes' data={componentesData}></DropdownButton>
                        <DropdownButton title='Perifericos' data={perifericosData}></DropdownButton>
                        <a href="/productos?categoria=monitores" className={styles.linkBottom}><Text>Monitores</Text></a>
                        <a href="/productos?categoria=notebooks" className={styles.linkBottom}><Text>Notebooks</Text></a>
                        <a href="/productos?categoria=computadoras" className={styles.linkBottom}><Text>Computadoras</Text></a>
                    </Group>
                </div>
            </header>
        </>
    )
}