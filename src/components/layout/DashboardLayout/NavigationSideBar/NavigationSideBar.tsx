import classes from './NavigationSideBar.module.css'

import { useParams } from 'react-router-dom'

import { ScrollArea, Text } from '@mantine/core'

import { LinksGroup } from './NavbarLinksGroup/NavbarLinksGroup.tsx'

import { IconChartBar, IconPackage, IconCategory, IconRegistered, IconShield, IconShoppingCart, IconUser } from '@tabler/icons-react'

import type { User } from '../../../../entities/user.ts'

type Tipo = 'productos' | 'marcas' | 'categorias' | 'pedidos' | 'administradores' | 'clientes' | '-'

export function NavigationSideBar({user}: {user: User}) {
    let { tipo } = useParams<{ tipo: Tipo }>()
    if ( tipo === undefined ) tipo = '-'

    const sidebarData = [
        { label: 'Resumen', icon: IconChartBar, link: '/' },
        {
            label: 'Productos',
            icon: IconPackage,
            initiallyOpened: (tipo.toLowerCase() === 'productos'),
            links: [
                { label: 'Ver productos', link: '/productos' },
                { label: 'Agregar producto', link: '/productos/new' },
            ],
        },
        {
            label: 'Marcas',
            icon: IconRegistered,
            initiallyOpened: (tipo.toLowerCase() === 'marcas'),
            links: [
                { label: 'Ver marcas', link: '/marcas' },
                { label: 'Agregar marca', link: '/marcas/new' },
            ],
        },
        {
            label: 'Categorias',
            icon: IconCategory,
            initiallyOpened: (tipo.toLowerCase() === 'categorias'),
            links: [
                { label: 'Ver categorias', link: '/categorias' },
                { label: 'Agregar categoria', link: '/categorias/new' },
            ],
        },
            {
            label: 'Pedidos',
            icon: IconShoppingCart,
            initiallyOpened: (tipo.toLowerCase() === 'pedidos'),
            links: [
                { label: 'Ver pedidos', link: '/pedidos' },
            ],
        },
        {
            label: 'Clientes',
            icon: IconUser,
            initiallyOpened: (tipo.toLowerCase() === 'clientes'),
            links: [
                { label: 'Ver clientes', link: '/clientes' },
                { label: 'Agregar clientes', link: '/clientes/new' },
            ],
        },
    ]

    if (user.role === 'superadmin') {
        sidebarData.push({
            label: 'Administradores',
            icon: IconShield,
            initiallyOpened: (tipo.toLowerCase() === 'administradores'),
            links: [
                { label: 'Ver administradores', link: '/administradores' },
                { label: 'Agregar administrador', link: '/' },
                { label: 'Modificar administrador', link: '/' },
            ]},
        )
    }

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