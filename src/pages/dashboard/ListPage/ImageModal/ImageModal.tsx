import { useState, useEffect } from "react";

import { Modal, Image } from "@mantine/core";

import noImage from '../../../../assets/noImage.png'

import type { Producto } from "../../../../entities/producto.ts";
import type { Imagen } from "../../../../entities/imagen.ts";
import type { Marca } from "../../../../entities/marca.ts";
import type { Categoria } from "../../../../entities/categoria.ts";
import type { Pedido } from "../../../../entities/pedido.ts";
import type { Cliente } from "../../../../entities/cliente.ts";

interface ImageModalProps {
    item: Producto | Marca | Categoria | Pedido | Cliente | null
    tipo: string
    imgIdx: number
    setViewItem: (item: Producto | Marca | Categoria | Pedido | Cliente | null) => void
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

    if (item) {
        if (tipo === 'productos') {
            const prod = item as Producto

            imagen = prod.imagenes[imgIdx]
            title = `${prod.nombre} [${imgIdx+1}/${prod.imagenes.length}]`
        } else if (tipo === 'marcas') {
            const marca = item as Marca

            imagen = marca.imagen
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
            <Modal opened={opened} onClose={handleClose} title={title} size='40%'
            overlayProps={{backgroundOpacity: 0.55, blur: 2}}>
                <Image src={getImagenUrl(imagen, 'large')} style={{maxHeight: 600, maxWidth: 600, objectFit: 'contain', padding: 50}}></Image>
            </Modal>
        </>
    )
}