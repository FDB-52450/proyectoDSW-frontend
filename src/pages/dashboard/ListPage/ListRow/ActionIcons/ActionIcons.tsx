import { useNavigate } from "react-router-dom"
import { useDisclosure } from "@mantine/hooks"
import { useState } from "react"

import { ActionIcon, Table, Tooltip } from "@mantine/core"

import { DeleteModal } from "../../../../../components/confirmationModals/DeleteModal.tsx"
import { PedidoModal } from "../../../../../components/confirmationModals/PedidoModal.tsx"

import { IconBan, IconCheck, IconEyeOff, IconSettings, IconTrash, IconX } from "@tabler/icons-react"

import type { Pedido } from "../../../../../entities/pedido.ts";
import type { Cliente } from "../../../../../entities/cliente.ts";
import type { Producto } from "../../../../../entities/producto.ts";
import type { Marca } from "../../../../../entities/marca.ts";
import type { Categoria } from "../../../../../entities/categoria.ts";

type Tipo = 'productos' | 'marcas' | 'categorias' | 'pedidos' | 'clientes'

interface ActionIconsProps {
    tipo: Tipo, 
    item: Producto | Marca | Categoria | Pedido | Cliente
}

export function ActionIcons({tipo, item}: ActionIconsProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const [action, setAction] = useState<string>('')
    const navigate = useNavigate()

    let returnData;

    const tipoNombre = tipo.slice(0, -1)

    if (tipo === 'pedidos') {
        const ped = item as Pedido

        returnData = (
            <>
                <Tooltip label={`Confirmar ${tipoNombre}`}>
                    <ActionIcon color='green' mr={5} disabled={ped.estado != 'pendiente'} onClick={() => {setAction('confirmado'); open()}}>
                        <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip label={`Cancelar ${tipoNombre}`}>
                    <ActionIcon color="red" disabled={ped.estado != 'pendiente'} onClick={() => {setAction('cancelado'); open()}}>
                        <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
                <PedidoModal estadoNuevo={action} id={String(ped.id)} isOpen={opened} setClose={close}></PedidoModal>
            </>
        )
    } else if (tipo === 'clientes') {
        const cli = item as Cliente

        returnData = (
            <>
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
                <Tooltip label={`Ocultar ${tipoNombre}`}>
                    <ActionIcon color="gray" mr={5}>
                        <IconEyeOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label={`Borrar ${tipoNombre}`}>
                    <ActionIcon color="red" onClick={open}>
                        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
                <DeleteModal tipo={tipo} id={String(item ? item.id : 0)} isOpen={opened} setClose={close}></DeleteModal>
            </>    
        )
    } else {
        returnData = (
            <>
                <Tooltip label={`Borrar ${tipoNombre}`}>
                    <ActionIcon color="red" onClick={open}>
                        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Tooltip>
                <DeleteModal tipo={tipo} id={String(item ? item.id : 0)} isOpen={opened} setClose={close}></DeleteModal>
            </>    
        )
    }

    return (
        <Table.Td style={{ textAlign: 'right' }}>
            <Tooltip label={`Modificar ${tipoNombre}`}>
                <ActionIcon color='blue' mr={5} onClick={() => navigate(`${item.id}`)}>
                    <IconSettings style={{ width: '70%', height: '70%' }} stroke={1.5}/>
                </ActionIcon>
            </Tooltip>
            {returnData}
        </Table.Td>
    )
}