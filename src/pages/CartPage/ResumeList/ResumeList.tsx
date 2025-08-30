import styles from './ResumeList.module.css'

import { useContext } from "react"
import { CartContext } from "../../../context/CartContext.tsx"

import { Button, Stack, Text, Group, Divider } from "@mantine/core"

import type { PedidoProd } from "../../../entities/pedidoProd.ts"

export function ResumeList() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error("CartContext must be used within a provider")
    }

    const { cart, setCart } = context

    function calcularTotal() {
        return cart.reduce((sum, item) => { return sum = sum + (item.producto.precioFinal * item.cantidad) }, 0)
    }

    return (
        <>
            <div className={styles.resumeContainer}>
                <Stack align="center">
                    <Text size='lg'>Resumen</Text>
                </Stack>
                <Divider mt={10} mb={20}></Divider>
                <Stack>
                    <Group justify="space-between">
                        <Text size='sm' fw={600}>PRODUCTO</Text>
                        <Text size='sm' fw={600}>SUBTOTAL</Text>
                    </Group>
                    {cart.map((cartProd: PedidoProd) => (
                        <Group justify="space-between">
                            <Stack gap={5} w='50%'>
                                <Text size='sm' truncate="end" style={{whiteSpace: 'normal', overflowWrap: 'break-word', maxWidth: '100%'}}>{cartProd.producto.nombre}</Text>
                                <Text size='xs' c='blue'>[x{cartProd.cantidad}] </Text>
                            </Stack>
                            <Text size='sm'>${(cartProd.producto.precioFinal * cartProd.cantidad).toLocaleString('AR-as')}</Text>
                        </Group>
                    ))}
                    <Divider/>
                    <Group justify="space-between">
                        <Text fw={600}>TOTAL</Text>
                        <Text>${calcularTotal().toLocaleString('AR-as')}</Text>
                    </Group>
                    <Divider/>
                    <Button component='a' href='/checkout'>FINALIZAR COMPRAR</Button>
                    <Button variant="filled" color="red" onClick={() => setCart([])}>BORRAR COMPRAR</Button>
                </Stack>
            </div>
        </>
    )
}