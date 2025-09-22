import { useState, useEffect } from "react";

import { Modal, Image, Group } from "@mantine/core";

import noImage from '../../../../assets/noImage.png'

import type { Producto } from "../../../../entities/producto.ts";
import type { Imagen } from "../../../../entities/imagen.ts";
import type { Marca } from "../../../../entities/marca.ts";
import type { Categoria } from "../../../../entities/categoria.ts";
import type { Pedido } from "../../../../entities/pedido.ts";
import type { Cliente } from "../../../../entities/cliente.ts";
import type { Administrador } from "../../../../entities/administrador.ts";

interface ImageModalProps {
    item: Producto | Marca | Categoria | Pedido | Cliente | Administrador | null
    tipo: string
    imgIdx: number
    setViewItem: (item: Producto | Marca | Categoria | Pedido | Cliente | Administrador | null) => void
    setViewImageIdx: (idx: number) => void
}

export function ImageModal({item, tipo, imgIdx, setViewItem, setViewImageIdx}: ImageModalProps) {
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        if (item) setOpened(true);
    }, [item])

    function getImagenUrl(imagen: Imagen, size: string) {
        if (!(imagen.url === noImage)) {
            return `http://localhost:8080/images/${imagen.url}/${size}.webp`
        } else {
            return noImage
        }
    }

    let imagen: Imagen = {id: -1, url: noImage, imagenPrimaria: true} // FALLBACK
    let title = '-'
    let size = {value: 'medium', dimensions: 250}

    if (item) {
        if (tipo === 'productos') {
            const prod = item as Producto

            imagen = prod.imagenes[imgIdx]
            title = `${prod.nombre} [${imgIdx+1}/${prod.imagenes.length}]`
            size = {value: 'large', dimensions: 500}
        } else if (tipo === 'marcas') {
            const marca = item as Marca

            imagen = marca.imagen ? marca.imagen : imagen
            title = marca.nombre
        }
    }

    function handleClose() {
        setOpened(false)
        setTimeout(() => {
            setViewItem(null);
            setViewImageIdx(0);
        }, 200);
    }

    return (
        <>
            <Modal opened={opened} onClose={handleClose} title={title} centered
            overlayProps={{backgroundOpacity: 0.55, blur: 2}}>
                <Group w='100%' justify="center">
                    <Image src={getImagenUrl(imagen, size.value)} style={{maxHeight: size.dimensions, maxWidth: size.dimensions, objectFit: 'contain', padding: 50}}></Image>
                </Group>
            </Modal>
        </>
    )
}