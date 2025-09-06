import styles from './ProductPage.module.css'

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useMediaQuery } from '@mantine/hooks'

import { fetchProduct } from "../../services/productService.ts"

import { Container, Group, Stack, Image, Text, Flex, Title, Divider, Badge, Tooltip} from "@mantine/core"

import { AddToCartButton } from './AddToCartButton/AddToCartButton.tsx'
import { CopyLinkButton } from './CopyLinkButton/CopyLinkButton.tsx'
import { ItemList } from './ItemList/ItemList.tsx'
import { ImageSection } from './ImageSection/ImageSection.tsx'
import { PaymentsList } from './PaymentsList/PaymentsList.tsx'
import { NotFoundError } from './NotFoundError/NotFoundError.tsx'

import { IconChevronRight } from '@tabler/icons-react'

import noImage from '../../assets/noImage.png'

import type { Producto } from "../../entities/producto.ts"
import type { Imagen } from '../../entities/imagen.ts'


export function ProductPage() {   
    const [product, setProduct] = useState<Producto>()
    const [loading, setLoading] = useState(true)

    let { id } = useParams()

    if (id === undefined) id = "1"

    useEffect(() => {
        setLoading(true)

        if (id != undefined) {
            fetchProduct(id)
            .then((res) => {
                setProduct(res.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
        }
    }, [id])

    function getImagenUrl(imagen: Imagen | null) {
        if (imagen) {
            const imagenUrl = imagen.url
            return `http://localhost:8080/images/${imagenUrl}/large.webp`
        } else {
            return noImage
        }
    }

    function getPrecioSinIva(prodPrecio: number) {
        const precioFinal = prodPrecio / (1 + 0.21)
        return Math.ceil(precioFinal)
    }

    const isLaptop = useMediaQuery('(max-width: 1024px)')
    const isMobile = useMediaQuery('(max-width: 768px)')

    if (loading) {
        return <div>Loading...</div>
    }

    if (!product) {
        return <NotFoundError prodId={id}/>
    }
    
    return (
        <>
            <Container size={isLaptop ? (isMobile ? '95%' : '90%') : '70%'} className={styles.productContainer} mt={20}>
                <Stack>
                    <Group>
                        <IconChevronRight></IconChevronRight>
                        <Text size="xl" fw={550} component='a' href={`/productos?categoria=${product.categoria.nombre}`}>{product.categoria.nombre}</Text>
                    </Group>

                    <Divider mt={10} mb={20}/>

                    <Flex p={isMobile ? 10 : 20} direction={isMobile ? 'column' : 'row'}>
                        <Stack w={isMobile ? '100%' : '40%'} mb={isMobile ? 100 : 0}>
                            <ImageSection imagenes={product.imagenes}></ImageSection>
                        </Stack>

                        <Stack ml={isMobile ? 0 : 35} gap={0} align='flex-start' w={isMobile ? '100%' : '60%'}>
                            <Group mb={5}>
                                <Tooltip label={`Ver más productos de ${product.marca.nombre}`} withArrow position="right">
                                    <a href={`/productos?marca=${product.marca.nombre}`}>
                                        <Image src={getImagenUrl(product.marca.imagen)} style={{maxHeight: 75, maxWidth: 75, objectFit: 'contain'}}></Image>
                                    </a>
                                </Tooltip>
                            </Group>

                            <Title order={isMobile ? 2 : 1}>{product.nombre.replace(product.marca.nombre, '')}</Title>

                            <Divider my="md" w='100%' mb={20} mt={20}/>

                            <Stack gap={10}>
                                <ItemList prod={product}/>
                            </Stack>

                            <Divider my="md" w='100%' mb={20} mt={20}/>

                            <Stack gap={0} w='100%'>
                                <Group align='center'>
                                    <Title order={isMobile ? 6 : 4} c="dimmed" style={{ lineHeight: 1 }} mt={3} td="line-through">
                                        ${product.precio.toLocaleString("es-AR")}
                                    </Title>
                                    <Badge variant="outline" color="green" size='md'>{product.descuento}% off</Badge>
                                </Group>
                                <Group justify='space-between' w='100%' mb={5}>
                                    <Title order={isMobile ? 2 : 1} style={{ lineHeight: 1 }}>
                                        ${product.precioFinal.toLocaleString("es-AR")}
                                    </Title>
                                    <PaymentsList prodPrecio={product.precioFinal}></PaymentsList>
                                </Group>
                                <Text size={isMobile ? 'xs' : 'sm'} c="dimmed" style={{ lineHeight: 1 }}>
                                    Precio s/impuestos: ${getPrecioSinIva(product.precioFinal).toLocaleString("es-AR")}
                                </Text>
                            </Stack>

                            <Divider my="md" w='100%' mb={20} mt={20}/>
                            
                            <Group justify='space-between' w='100%'>
                                <AddToCartButton product={product}></AddToCartButton>
                                <CopyLinkButton></CopyLinkButton>
                            </Group>
                        </Stack>
                    </Flex>

                    <Stack justify='center' pr={20} pl={20} className={styles.descriptionContainer}>
                        <Title mb={10}>Descripción</Title>
                        <Text size='md' c='dimmed' style={{whiteSpace: 'pre-line'}}>{product.desc}</Text>
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}

// TODO: Finish this page; lacks similar products section at the bottom.