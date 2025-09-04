import { Menu, Button, Group, Text} from '@mantine/core';

const cuotasData = [
    {cantCuotas: 3, porcentajeAplicado: 0.05},
    {cantCuotas: 6, porcentajeAplicado: 0.1},
    {cantCuotas: 9, porcentajeAplicado: 0.25},
    {cantCuotas: 12, porcentajeAplicado: 0.5},
    {cantCuotas: 18, porcentajeAplicado: 1},
    {cantCuotas: 24, porcentajeAplicado: 2}
]

export function PaymentsList({prodPrecio}: {prodPrecio: number}) {
    function getPrecioFinal(porcentajeAplicado: number) {
        const precioFinal = prodPrecio * (1 + porcentajeAplicado)
        return Math.ceil(precioFinal)
    }

    return (
        <Menu trigger="click-hover" openDelay={50} closeDelay={100} position='bottom-end' withArrow
        transitionProps={{ transition: 'fade-up', duration: 150 }} >
            <Menu.Target>
                <Button size='md'>Ver cuotas</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label> Cuotas </Menu.Label>
                <Menu.Divider></Menu.Divider>
                    {cuotasData.map((cuota) => (
                        <Menu.Item style={{backgroundColor: 'transparent', cursor: 'default'}} onMouseOver={(e) => {e.currentTarget.style.backgroundColor = 'transparent'}}>
                            <Group justify='space-between' gap={25}>
                                <Text size='sm' fw={600}>{cuota.cantCuotas} cuotas</Text>
                                <Text size='sm'>${getPrecioFinal(cuota.porcentajeAplicado).toLocaleString('AR-as')}</Text>
                            </Group>
                        </Menu.Item>
                    ))}
            </Menu.Dropdown>
        </Menu>
    )
}