import styles from '../CheckoutPage.module.css'

import { Divider, Grid, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import type { UseFormReturnType } from '@mantine/form';
import { IconChevronDown } from "@tabler/icons-react";
import type { FormInterface } from '../CheckoutPage.tsx';
import { useMediaQuery } from '@mantine/hooks';

const provincias = ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa",
    "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
    "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán", "Ciudad Autonoma de Buenos Aires"
]

export function PersonalDataSection({form}: {form: UseFormReturnType<FormInterface>}) {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const isLaptop = useMediaQuery('(max-width: 1024px)')
    const isLargeLaptop = useMediaQuery('(max-width: 1440px)')

    const containerWidth = isMobile ? '100%' : (isLaptop ? '85%' : (isLargeLaptop ? '80%': '70%'))
    const rowHeight = isMobile ? 85 : (isLaptop ? 105 : 105)

    return (
        <Stack w={containerWidth} m='auto' className={styles.mainContainer} gap={25} p={20}>
            <Group justify='center' mb={-5}>
                <Text size='30px' fw={600} ta='center'>DATOS PERSONALES</Text>
            </Group>

            <Divider></Divider>

            <Grid gutter='xl' grow>
                <Grid.Col h={rowHeight} span={{ base: 12, md: 3, lg: 3 }}>
                    <TextInput label='DNI' description={isMobile ? '' : "Ingrese su DNI"} {...form.getInputProps('cliente.dni')}/>
                </Grid.Col>
                <Grid.Col h={rowHeight} span={{ base: 12, md: 4.5, lg: 4.5 }}>
                    <TextInput label='Nombre' description={isMobile ? '' : "Ingrese su nombre"} {...form.getInputProps('cliente.nombre')}/>
                </Grid.Col>
                <Grid.Col h={rowHeight} span={{ base: 12, md: 4.5, lg: 4.5 }}>
                    <TextInput label='Apellido' description={isMobile ? '' : "Ingrese su apellido"} {...form.getInputProps('cliente.apellido')}/>
                </Grid.Col>
                <Grid.Col h={rowHeight} span={{ base: 12, md: 6, lg: 6 }}>
                    <TextInput label='Email' description={isMobile ? '' : "Ingrese su email"} {...form.getInputProps('cliente.email')}/>
                </Grid.Col>
                <Grid.Col h={rowHeight} span={{ base: 12, md: 6, lg: 6 }}>
                    <TextInput label='Telefono' description={isMobile ? '' : "Ingrese su telefono"} placeholder='+54 9 [cod. area] [cod. abonado]' 
                    {...form.getInputProps('cliente.telefono')}/>
                </Grid.Col>
                <Grid.Col h={rowHeight} span={{ base: 12, md: 3, lg: 2.5 }}>
                    <Select data={provincias} label='Provincia' description={isMobile ? '' : "Ingrese su provincia"} {...form.getInputProps('cliente.provincia')}
                    rightSectionPointerEvents="none" rightSection={<IconChevronDown size={16}/>}/>
                </Grid.Col>
                <Grid.Col h={rowHeight} span={{ base: 12, md: 3, lg: 3 }}>
                    <TextInput label='Ciudad' description={isMobile ? '' : "Ingrese su ciudad"} {...form.getInputProps('cliente.ciudad')}/>
                </Grid.Col>
                <Grid.Col h={rowHeight} span={{ base: 12, md: 3, lg: 3 }}>
                    <TextInput label='Direccion' description={isMobile ? '' : "Ingrese su direccion"} {...form.getInputProps('cliente.direccion')}/>
                </Grid.Col>
                <Grid.Col h={rowHeight + 25} span={{ base: 12, md: 3, lg: 2.5 }}>
                    <TextInput label='Codigo Postal' description={isMobile ? '' : "Ingrese su cod. postal"} {...form.getInputProps('cliente.codigoPostal')}/>
                </Grid.Col>
            </Grid>
        </Stack>
    )
}