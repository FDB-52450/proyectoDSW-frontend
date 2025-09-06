import classes from './NavigationSideBar.module.css'

import { useParams } from 'react-router-dom'

import { ScrollArea, Text } from '@mantine/core'

import { LinksGroup } from './NavbarLinksGroup/NavbarLinksGroup.tsx'

import { IconChartBar, IconPackage, IconCategory, IconRegistered, IconShield, IconShoppingCart } from '@tabler/icons-react'

type Tipo = 'productos' | 'marcas' | 'categorias' | 'pedidos' | 'administradores' | '-'

export function NavigationSideBar() {
    let { tipo } = useParams<{ tipo: Tipo }>();
    if ( tipo === undefined ) tipo = '-'

    const sidebarData = [
        { label: 'Resumen', icon: IconChartBar, link: '/' },
        {
            label: 'Productos',
            icon: IconPackage,
            initiallyOpened: (tipo.toLowerCase() === 'productos'),
            links: [
                { label: 'Ver productos', link: '/productos' },
                { label: 'Agregar producto', link: '/productos' },
                { label: 'Modificar producto', link: '/productos' },
            ],
        },
        {
            label: 'Marcas',
            icon: IconRegistered,
            initiallyOpened: (tipo.toLowerCase() === 'marcas'),
            links: [
                { label: 'Ver marcas', link: '/marcas' },
                { label: 'Agregar marca', link: '/marcas' },
                { label: 'Modificar marca', link: '/marcas' },
            ],
        },
        {
            label: 'Categorias',
            icon: IconCategory,
            initiallyOpened: (tipo.toLowerCase() === 'categorias'),
            links: [
                { label: 'Ver categorias', link: '/categorias' },
                { label: 'Agregar categoria', link: '/categorias' },
                { label: 'Modificar categoria', link: '/categorias' },
            ],
        },
            {
            label: 'Pedidos',
            icon: IconShoppingCart,
            initiallyOpened: (tipo.toLowerCase() === 'pedidos'),
            links: [
                { label: 'Ver pedidos', link: '/pedidos' },
                { label: 'Modificar pedido', link: '/' },
            ],
        },
        {
            label: 'Administradores',
            icon: IconShield,
            initiallyOpened: (tipo.toLowerCase() === 'administradores'),
            links: [
                { label: 'Ver administradores', link: '/administradores' },
                { label: 'Agregar administrador', link: '/' },
                { label: 'Modificar administrador', link: '/' },
            ],
        },
    ]

    const links = sidebarData.map((item) => <LinksGroup {...item} key={item.label} />)

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Text size='xl' fw={625}>Dashboard</Text>
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>
        </nav>
    )
}