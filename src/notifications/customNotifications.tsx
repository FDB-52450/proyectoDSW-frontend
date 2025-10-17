import { notifications } from '@mantine/notifications';

import { IconAlertTriangle, IconCheck, IconPlus, IconShoppingCart, IconTrash } from '@tabler/icons-react';

export function pushCreateNotification(tipo: string) {
    const nombreTipo = tipo === 'administradores' ? tipo.slice(0, -2): tipo.slice(0, -1)
    const articulo = (tipo === 'marcas' || tipo === 'categorias') ? 'La' : 'El'

    notifications.show({
        title: 'Entidad creada con exito',
        message: `${articulo} ${nombreTipo} ha sido cread${articulo === 'La' ? 'a' : 'o'} con exito.`,
        color: 'blue',
        position: 'bottom-center',
        icon: <IconPlus size={20} />,
        autoClose: 5000
    })
}

export function pushUpdateNotification(tipo: string) {
    const nombreTipo = tipo === 'administradores' ? tipo.slice(0, -2): tipo.slice(0, -1)
    const articulo = (tipo === 'marcas' || tipo === 'categorias') ? 'La' : 'El'

    notifications.show({
        title: 'Entidad actualizada con exito',
        message: `${articulo} ${nombreTipo} ha sido actualizad${articulo === 'La' ? 'a' : 'o'} con exito.`,
        color: 'green',
        position: 'bottom-center',
        icon: <IconCheck size={20} />,
        autoClose: 5000
    })
}

export function pushDeleteNotification(tipo: string) {
    const nombreTipo = tipo === 'administradores' ? tipo.slice(0, -2): tipo.slice(0, -1)
    const articulo = (tipo === 'marcas' || tipo === 'categorias') ? 'La' : 'El'

    notifications.show({
        title: 'Entidad borrada con exito',
        message: `${articulo} ${nombreTipo} ha sido borrad${articulo === 'La' ? 'a' : 'o'} con exito.`,
        color: 'red',
        position: 'bottom-center',
        icon: <IconTrash size={20} />,
        autoClose: 5000
    })
}

export function pushErrorNotification(codigo: number, message: string) {
    notifications.show({
        title: 'Ha ocurrido un error!',
        message: `[ERROR ${codigo}]: ${message}`,
        color: 'red',
        position: 'bottom-center',
        icon: <IconAlertTriangle size={20} />,
        autoClose: false
    })
}

export function pushCreatePedido() {
    notifications.show({
        title: 'Pedido creado con éxito!',
        message: 'Gracias por comprar en Hardware Nexus.',
        color: 'green',
        position: 'bottom-center',
        icon: <IconCheck size={20} />,
        autoClose: 100000
    })
}

export function pushAddToCart(productName: string) {
    notifications.show({
        title: 'Producto agregado al carrito!',
        message: `El producto ${productName} ha sido agregado al carrito.`,
        color: 'blue',
        position: 'bottom-center',
        icon: <IconShoppingCart size={20} />,
        autoClose: 2500
    })
}