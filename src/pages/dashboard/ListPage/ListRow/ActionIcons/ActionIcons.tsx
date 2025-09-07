import { ActionIcon, Table, Tooltip } from "@mantine/core";

import { IconBan, IconCheck, IconEyeOff, IconSettings, IconTrash, IconX } from "@tabler/icons-react";

import type { Pedido } from "../../../../../entities/pedido.ts";
import type { Cliente } from "../../../../../entities/cliente.ts";
import type { Producto } from "../../../../../entities/producto.ts";
import type { Marca } from "../../../../../entities/marca.ts";
import type { Categoria } from "../../../../../entities/categoria.ts";

type Tipo = 'productos' | 'marcas' | 'categorias' | 'pedidos' | 'clientes'

interface ActionIconsProps {
    tipo: Tipo, 
    item?: Producto | Marca | Categoria | Pedido | Cliente | null
}

export function ActionIcons({tipo, item}: ActionIconsProps) {
    let returnData;

    const tipoNombre = tipo.slice(0, -1)

    if (tipo === 'pedidos') {
        if (!item) return null

        const ped = item as Pedido

        returnData = (
            <>
                <Tooltip label={`Modificar ${tipoNombre}`}>
                    <ActionIcon color='blue' mr={5}>
                        <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip label={`Confirmar ${tipoNombre}`}>
                    <ActionIcon color='green' mr={5} disabled={ped.estado != 'pendiente'}>
                        <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip label={`Cancelar ${tipoNombre}`}>
                    <ActionIcon color="red" disabled={ped.estado != 'pendiente'}>
                        <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </>
        )
    } else if (tipo === 'clientes') {
        if (!item) return null

        const cli = item as Cliente

        returnData = (
            <>
                <Tooltip label={`Modificar ${tipoNombre}`}>
                    <ActionIcon color='blue' mr={5}>
                        <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                    </ActionIcon>
                </Tooltip>
                {cli.banStart ?
                <Tooltip label={`Rehabilitar ${tipoNombre}`}>
                    <ActionIcon color='green' mr={5}>
                        <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                    </ActionIcon>
                </Tooltip> 
                :
                <Tooltip label={`Suspender ${tipoNombre}`}>
                    <ActionIcon color='red' mr={5}>
                        <IconBan style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                    </ActionIcon>
                </Tooltip>
                }
            </>
        )
    } else if (tipo === 'productos') {
        returnData = (
            <>
                <Tooltip label={`Modificar ${tipoNombre}`}>
                    <ActionIcon color='blue' mr={5}>
                        <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip label={`Ocultar ${tipoNombre}`}>
                    <ActionIcon color="gray" mr={5}>
                        <IconEyeOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label={`Borrar ${tipoNombre}`}>
                    <ActionIcon color="red">
                        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </>    
        )
    } else {
        returnData = (
            <>
                <Tooltip label={`Modificar ${tipoNombre}`}>
                    <ActionIcon color='blue' mr={5}>
                        <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip label={`Borrar ${tipoNombre}`}>
                    <ActionIcon color="red">
                        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
            </>    
        )
    }

    return (
        <Table.Td style={{ textAlign: 'right' }}>
            {returnData}
        </Table.Td>
    )
}