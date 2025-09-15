import { Divider, Group, Stack, Text } from "@mantine/core";

import type { PedidoProd } from "../../../entities/pedidoProd.ts";

export function PedidoResume({cart}: {cart: PedidoProd[]}) {
    function calcularTotal() {
        return cart.reduce((sum, item) => { return sum = sum + (item.producto.precioFinal * item.cantidad) }, 0)
    }

    return (
        <>
            <Stack align="center">
                <Text size='lg' fw={600}>LISTADO DE PRODUCTOS</Text>
            </Stack>

            <Divider></Divider>

            <Stack>
                <Group justify="space-between">
                    <Text size='sm' fw={600}>PRODUCTO</Text>
                    <Text size='sm' fw={600}>SUBTOTAL</Text>
                </Group>
                {cart.map((cartProd: PedidoProd) => (
                    <Group justify="space-between">
                        <Group gap={5} w='80%'>
                            <Text size='xs' c='blue'>[x{cartProd.cantidad}]</Text>
                            <Text size='sm' truncate="end" style={{whiteSpace: 'normal', overflowWrap: 'break-word', maxWidth: '100%'}}>{cartProd.producto.nombre}</Text>
                        </Group>
                        <Text size='sm'>${(cartProd.producto.precioFinal * cartProd.cantidad).toLocaleString('es-AR')}</Text>
                    </Group>
                ))}
                <Divider/>
                <Group justify="space-between">
                    <Text fw={600}>TOTAL</Text>
                    <Text fw={600}>${calcularTotal().toLocaleString('es-AR')}</Text>
                </Group>
            </Stack>
        </>
    )
}