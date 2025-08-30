import classes from './ProductCard.module.css'

import { useContext } from 'react'
import { CartContext } from '../../../context/CartContext.tsx'

import { Badge, Button, Card, Flex, Group, Image, Stack, Text } from '@mantine/core'

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
                <Card.Section className={classes.imageSection}>
                    <Image style={{maxHeight: 200, maxWidth: 175, objectFit: 'contain'}} src={getProductUrl(product)} alt={product.nombre} />
                </Card.Section>

                <Stack mt="md" gap={5}>
                    <Text fw={500} lineClamp={3}>{product.nombre}</Text>
                    {product.descuento === 0 ? '' :<Badge variant="outline" color="green" size='sm'>{product.descuento}% off</Badge>}
                </Stack>

                <Group gap={20} mt='auto' justify='space-between'>
                    <div>
                        {product.descuento == 0 ? '' :
                        <Flex gap={10}>
                            <Text fz="xs" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3} td="line-through">
                                ${product.precio.toLocaleString("es-AR")}
                            </Text>
                        </Flex>}
                        <Text fz="h3" fw={700} style={{ lineHeight: 1 }}>
                            ${product.precioFinal.toLocaleString("es-AR")}
                        </Text>
                    </div>

                    <Button radius="md" onClick={addToCart}>
                        <IconShoppingCart/>
                    </Button>
                </Group>
            </Card>
        </div>
    )
}