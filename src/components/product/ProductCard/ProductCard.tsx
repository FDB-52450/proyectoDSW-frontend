import classes from './ProductCard.module.css'

import { useContext } from 'react'
import { CartContext } from '../../../context/CartContext.tsx'

import { Badge, Button, Card, Flex, Image, Stack, Text } from '@mantine/core'

import { IconShoppingCart } from '@tabler/icons-react'
import noImage from '../../../assets/noImage.png'

import type { Producto } from '../../../entities/producto.ts'
import type { PedidoProd } from '../../../entities/pedidoProd.ts'

export function ProductCard({product}: {product: Producto}) {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error("CartContext must be used within a provider")
    }

    const {setCart} = context

    function addToCart() {
        setCart((currItems: Array<PedidoProd>) => {
            const isItemsFound = currItems.find((item: PedidoProd) => item.producto.id === product.id)

            if (isItemsFound) {
                return currItems.map((item) => {
                    if (item.producto.id === product.id) {
                        return { ...item, cantidad: item.cantidad + 1 }
                    } else {
                        return item
                    }
                })
            } else {
                const pedProd: PedidoProd = {producto: product, cantidad: 1}
                return [...currItems, pedProd]
            }
        })
    }

    function getProductUrl(prod: Producto) {
        if (prod.imagenes[0]) {
            const imagenUrl = prod.imagenes[0].url
            return `http://localhost:8080/images/${imagenUrl}/medium.webp`
        } else {
            return noImage
        }
    }

    return (
        <div className={product.destacado ? classes.animatedRgbBorder : classes.emptyBorder}>
            <Card radius="md" className={classes.card} h={425}>
                <Card.Section className={classes.imageSection} component='a' href={'/producto/' + product.id}>
                    <Image style={{maxHeight: 200, maxWidth: 175, objectFit: 'contain'}} src={getProductUrl(product)} alt={product.nombre} />
                </Card.Section>

                <Stack mt="md" gap={5}>
                    <Text fw={500} lineClamp={3} component='a' href={'/producto/' + product.id}>{product.nombre}</Text>
                    {product.descuento === 0 ? '' :<Badge color="green" size='md'>-{product.descuento}%</Badge>}
                </Stack>

                <Flex gap={20} mt='auto' justify='space-between' align='flex-end'>
                    <Stack gap={5} justify='flex-end'>
                        {product.descuento == 0 ? '' :
                            <Text size='13' c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3} td="line-through">
                                ${product.precio.toLocaleString("es-AR")}
                            </Text>}
                        <Text fz="h3" fw={600} style={{ lineHeight: 1 }}>
                            ${product.precioFinal.toLocaleString("es-AR")}
                        </Text>
                    </Stack>

                    <Button radius="md" onClick={addToCart}>
                        <IconShoppingCart/>
                    </Button>
                </Flex>
            </Card>
        </div>
    )
}