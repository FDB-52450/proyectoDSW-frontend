import { notifications } from '@mantine/notifications';

import { IconAlertTriangle, IconCheck, IconPlus, IconTrash } from '@tabler/icons-react';

export function pushCreateNotification(tipo: string) {
    notifications.show({
        title: 'Entidad creada con exito',
        message: `La ${tipo.slice(0, -1)} ha sido creada con exito.`,
        color: 'blue',
        position: 'bottom-center',
        icon: <IconPlus size={20} />,
        autoClose: 5000
    })
}

export function pushUpdateNotification(tipo: string) {
    notifications.show({
        title: 'Entidad actualizada con exito',
        message: `La ${tipo.slice(0, -1)} ha sido actualizada con exito.`,
        color: 'green',
        position: 'bottom-center',
        icon: <IconCheck size={20} />,
        autoClose: 5000
    })
}

export function pushDeleteNotification(tipo: string) {
    notifications.show({
        title: 'Entidad borrada con exito',
        message: `La ${tipo.slice(0, -1)} ha sido borrada con exito.`,
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