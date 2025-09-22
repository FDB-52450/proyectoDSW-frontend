import { Table, Image, Group, UnstyledButton, Tooltip } from "@mantine/core";

import { ActionIcons } from "./ActionIcons/ActionIcons.tsx";

import { IconBan, IconCheck, IconClock, IconDots, IconPhotoX, IconQuestionMark, IconX } from "@tabler/icons-react";

import type { Producto } from "../../../../entities/producto.ts";
import type { Marca } from "../../../../entities/marca.ts";
import type { Categoria } from "../../../../entities/categoria.ts";
import type { Imagen } from "../../../../entities/imagen.ts";
import type { Pedido } from "../../../../entities/pedido.ts";
import type { Cliente } from "../../../../entities/cliente.ts"
import type { Administrador } from "../../../../entities/administrador.ts";

interface ListRowProps {
    tipo: string, 
    item: Producto | Marca | Categoria | Pedido | Cliente | Administrador
    setViewItem: (item: Producto | Marca | Categoria | Pedido | Cliente | Administrador | null) => void
    setViewImageIdx: (idx: number) => void
}

export function ListRow({tipo, item, setViewItem, setViewImageIdx}: ListRowProps) { 
    function getImagenUrl(imagen: Imagen, size: string) {
        return `http://localhost:8080/images/${imagen.url}/${size}.webp`
    }

    function handleSelectData(idx: number) {
        setViewItem(item)
        setViewImageIdx(idx)
    }

    function capitalize(str: string) { 
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    let tableRow = null

    if (tipo === 'productos') {
        const product = item as Producto

        if (product.stock === undefined) return null
        if (product.stockReservado === undefined) return null

        tableRow = (
            <>
                <Table.Td style={{ textAlign: 'center' }}>{product.id}</Table.Td>
                <Table.Td>{product.nombre}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>${product.precio.toLocaleString('es-AR')}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{product.descuento > 0 ? `${product.descuento}%` : '-'}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{product.stock}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{product.stockReservado === 0 ? '-' : product.stockReservado}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{product.destacado ? <IconCheck/> : <IconX/>}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{product.categoria.nombre}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{product.marca.nombre}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{new Date(product.fechaIngreso).toLocaleDateString()}</Table.Td>
                <Table.Td>
                    <Group gap={5} justify="center">
                        {product.imagenes.length >= 1 ? product.imagenes.map((img, idx) => (
                        <>
                            <UnstyledButton key={img.id} onClick={() => handleSelectData(idx)}>
                                    <Image src={getImagenUrl(img, 'small')} style={{maxHeight: 25, maxWidth: 25, objectFit: 'contain'}}></Image>
                            </UnstyledButton>
                        </>))
                        :
                        <Tooltip label='Este producto no tiene imagen'><IconPhotoX size={25}></IconPhotoX></Tooltip>}
                    </Group>
                </Table.Td>
            </>
        )
    } else if (tipo === 'marcas') {
        const marca = item as Marca

        tableRow = (
            <>
                <Table.Td style={{ textAlign: 'center' }}>{marca.id}</Table.Td>
                <Table.Td>{marca.nombre}</Table.Td>
                <Table.Td>
                    <Group gap={5} justify="center">
                        {marca.imagen ? 
                        <UnstyledButton onClick={() => handleSelectData(0)}>
                                <Image src={getImagenUrl(marca.imagen, 'small')} style={{maxHeight: 25, maxWidth: 25, objectFit: 'contain'}}></Image>
                        </UnstyledButton>
                        : 
                        <Tooltip label='Esta marca no tiene imagen'><IconPhotoX size={25}></IconPhotoX></Tooltip>}
                    </Group>
                </Table.Td>
            </>
        )
    } else if (tipo === 'categorias') {
        const categoria = item as Categoria

        tableRow = (
            <>
                <Table.Td style={{ textAlign: 'center' }}>{categoria.id}</Table.Td>
                <Table.Td>{categoria.nombre}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{categoria.duracionGarantia} meses</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{categoria.stockLimit} unidades</Table.Td>
            </>
        )
    } else if (tipo === 'pedidos') {
        const pedido = item as Pedido
        let content; 

        switch (pedido.estado) {
            case 'pendiente': content = <Tooltip label='Pendiente'><IconClock size={25}></IconClock></Tooltip>; break
            case 'confirmado': content = <Tooltip label='Confirmado'><IconCheck size={25}></IconCheck></Tooltip>; break
            case 'cancelado': content = <Tooltip label='Cancelado'><IconX size={25}></IconX></Tooltip>; break
            default: content = <Tooltip label='???'><IconQuestionMark size={25}></IconQuestionMark></Tooltip>
        }

        tableRow = (
            <>
                <Table.Td style={{ textAlign: 'center' }}>{pedido.id}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{capitalize(pedido.tipoEntrega)}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{capitalize(pedido.tipoPago)}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}> 
                    <Group gap={5} justify="center">
                        {content}
                    </Group>
                </Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>${pedido.precioTotal.toLocaleString('es-AR')}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>
                    <Group gap={5} justify="center">
                        <Tooltip label='Ver detalle completo'>
                            <UnstyledButton>
                                <IconDots size={20}/>
                            </UnstyledButton>
                        </Tooltip>
                    </Group>
                </Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{pedido.cliente.nombre}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{new Date(pedido.fechaEntrega).toLocaleDateString()}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{new Date(pedido.fechaPedido).toLocaleDateString()}</Table.Td>
            </>
        )
    } else if (tipo === 'clientes') {
        const cliente = item as Cliente

        const banDuration = cliente.banStart ? (cliente.banEnd ? 
            Math.floor((new Date(cliente.banEnd).getTime() - new Date(cliente.banStart).getTime()) / (1000 * 60 * 60 * 24)): Infinity) 
            : 0
        const banText = banDuration === Infinity ? 'El cliente esta suspendido de forma permanente' : `El cliente esta suspendido por ${banDuration} dias`

        tableRow = (
            <>
                <Table.Td style={{ textAlign: 'center' }}>{cliente.id}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{cliente.dni}</Table.Td>
                <Table.Td>{cliente.nombre}</Table.Td>
                <Table.Td>{cliente.apellido}</Table.Td>
                <Table.Td>{cliente.email}</Table.Td>
                <Table.Td>{cliente.telefono}</Table.Td>
                <Table.Td>{cliente.provincia}</Table.Td>
                <Table.Td>{cliente.ciudad}</Table.Td>
                <Table.Td>{cliente.direccion}</Table.Td>
                <Table.Td>{cliente.codigoPostal}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>
                    <Group gap={5} justify="center">
                        {banDuration === 0 ?
                        <Tooltip label='El usuario no esta bloqueado.'>
                            <IconX size={25}/>
                        </Tooltip> 
                        : 
                        <Tooltip label={banText}>
                            <IconBan size={25}/>
                        </Tooltip>}
                    </Group>
                </Table.Td>
            </>
        )
    } else if (tipo === 'administradores') {
        const admin = item as Administrador
 
        tableRow = (
            <>
                <Table.Td style={{ textAlign: 'center' }}>{admin.id}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{admin.nombre}</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>********</Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>{capitalize(admin.role)}</Table.Td>
            </>
        )
    }

    return (
        <>
            {tableRow}
            <ActionIcons tipo={tipo} item={item}></ActionIcons>
        </>
    )
}

export function ListTitleRow({tipo}: {tipo: string}) {
    let tableHeader = null

    if (tipo === 'productos') {
        tableHeader = (
            <>
                <Table.Th style={{ textAlign: 'center' }}>ID</Table.Th>
                <Table.Th>Nombre</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Precio</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Descuento</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Stock</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Stock Reservado</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Destacado?</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Categoria</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Marca</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Fecha de ingreso</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Imagenes</Table.Th>
            </>
        )
    } else if (tipo === 'marcas') {
        tableHeader = (
            <>
                <Table.Th style={{ textAlign: 'center' }}>ID</Table.Th>
                <Table.Th >Nombre</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Imagen</Table.Th>
            </>
        )
    } else if (tipo === 'categorias') {
        tableHeader = (
            <>
                <Table.Th style={{ textAlign: 'center' }}>ID</Table.Th>
                <Table.Th >Nombre</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Garantia</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Limite de stock</Table.Th>
            </>
        )
    } else if (tipo === 'pedidos') {
        tableHeader = (
            <>
                <Table.Th style={{ textAlign: 'center' }}>ID</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Tipo de Entrega</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Tipo de Pago</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Estado</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Precio Total</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Detalle</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Cliente</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Fecha de entrega</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Fecha de pedido</Table.Th>
            </>
        )
    } else if (tipo === 'clientes') {
        tableHeader = (
            <>
                <Table.Th style={{ textAlign: 'center' }}>ID</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>DNI</Table.Th>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Apellido</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Telefono</Table.Th>
                <Table.Th>Provincia</Table.Th>
                <Table.Th>Ciudad</Table.Th>
                <Table.Th>Direccion</Table.Th>
                <Table.Th>Codigo Postal</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Bloqueado?</Table.Th>
            </>
        )
    } else if (tipo === 'administradores') {
        tableHeader = (
            <>
                <Table.Th style={{ textAlign: 'center' }}>ID</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Nombre</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Contraseña</Table.Th>
                <Table.Th style={{ textAlign: 'center' }}>Rol</Table.Th>
            </>
        )
    }
    
    return (
        <>
            {tableHeader}
        </>
    )
}