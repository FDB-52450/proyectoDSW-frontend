import classes from './ProductCard.module.css'

import { useContext } from 'react'
import { CartContext } from '../../../context/CartContext.tsx'

import { pushAddToCart } from '../../../notifications/customNotifications.tsx'

import { Link } from 'react-router-dom'
import { Badge, Box, Button, Card, Flex, Image, Stack, Text, Tooltip } from '@mantine/core'

import { IconPhoto, IconShoppingCart, IconStarFilled } from '@tabler/icons-react'

import noImage from '../../../assets/noImage.png'

import type { Producto } from '../../../entities/producto.ts'
import type { PedidoProd } from '../../../entities/pedidoProd.ts'

export function ProductCard({product}: {product: Producto}) {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error("CartContext must be used within a provider")
    }

    const {cart, setCart} = context

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

        pushAddToCart(product.nombre)
    }

    function getPedidoProd() {
        const pedidoProd = cart.find((item: PedidoProd) => item.producto.id === product.id)

        return pedidoProd
    }

    function determineStockAvailability() {
        const pedidoProd = getPedidoProd()

        if (pedidoProd && pedidoProd.cantidad >= product.stockDisponible) {
            return false
        }

        return true
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
                <Card.Section className={classes.imageSection} component={Link} to={'/producto/' + product.id}
                style={{ position: 'relative', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                    {product.destacado && (
                    <Box pos="absolute" top={8} right={8} bg="rgba(255, 255, 255, 0.85)" p={4} style={{ zIndex: 2 }}>
                        <Tooltip label='Destacado'>
                            <IconStarFilled size={20} stroke={2} className={classes.rgbIcon}/>
                        </Tooltip>
                    </Box>)}
                    {product.imagenes[0] ? 
                    <Image style={{maxHeight: 200, maxWidth: 175, objectFit: 'contain'}} src={getProductUrl(product)} alt={product.nombre}/>
                    :
                    <Stack align='center' gap={5}>
                        <IconPhoto size={100} color="var(--mantine-color-dimmed)" stroke={0.75}/>
                        <Text size="xl" component='span' color="var(--mantine-color-dimmed)">Sin imagen</Text>
                    </Stack>} 
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
                 
                    <Box pos="relative" display="inline-block">
                        <Button radius="md" onClick={addToCart} disabled={!determineStockAvailability()}>
                            <IconShoppingCart />
                        </Button>

                        {getPedidoProd() ? 
                        <Badge color="red" size="sm" variant="filled" pos="absolute" top={-5} right={-5} px={5}>{getPedidoProd()?.cantidad}</Badge>
                        : null
                        }
                        </Box>
                </Flex>
            </Card>
        </div>
    )
}