import styles from './CheckoutPage.module.css'
import dayjs from 'dayjs'

import { useContext, useState } from "react"
import { useForm } from '@mantine/form'

import { createPedido } from '../../services/pedidoService.ts'

import { CartContext } from "../../context/CartContext.tsx"

import { Link } from 'react-router-dom'
import { Button, Card, Container, Divider, Flex, Group, Radio, Select, Stack, Stepper, Text, TextInput, Title, useMantineTheme } from "@mantine/core"
import { DateInput } from '@mantine/dates'

import { PedidoResume } from './PedidoResume/PedidoResume.tsx'

import { IconArrowLeft, IconArrowRight, IconCalendarClock, IconCheck, IconChevronDown, IconCoin, IconCreditCard, IconLabel, IconTruck, IconX } from "@tabler/icons-react"

import type { Pedido } from '../../entities/pedido.ts'

const provincias = ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa",
    "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
    "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán", "Ciudad Autonoma de Buenos Aires"
]

export function CheckoutPage() {
    const [active, setActive] = useState(0)
    const context = useContext(CartContext)
    const theme = useMantineTheme()

    const [createdPedido, setCreatedPedido] = useState<Pedido>()
    
    if (!context) {
        throw new Error("CartContext must be used within a provider")
    }
    
    const {cart, setCart} = context

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))
    const nextStep = () => {
        if (active < 2) {
            const fieldsToValidate = (active === 0) ? ['cliente.dni', 'cliente.nombre', 'cliente.apellido', 'cliente.email',
            'cliente.telefono', 'cliente.provincia','cliente.ciudad', 'cliente.direccion','cliente.codigoPostal'] :
            ['tipoPago', 'tipoEntrega', 'fechaEntrega']

            let hasError = false;

            for (const field of fieldsToValidate) {
                const result = form.validateField(field)

                if (result.hasError) {
                    hasError = true
                    form.setFieldError(field, result.error)
                }
            }

            if (!hasError) {
                setActive((current) => (current + 1))
            } 
        }

        if (active === 2) {
            setActive((current) => (current + 1))
        }
    }

    async function onComplete() {
        const response = await createPedido(formValues as Partial<Pedido>)

        setCreatedPedido(response)
        nextStep()
        setCart([])
    }

    function capitalize (str: string) { 
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    
    function getInitialDate(): Date {
        const fechaEntrega = new Date(Date.now())
        fechaEntrega.setDate(fechaEntrega.getDate() + 7)

        if (fechaEntrega.getDay() === 0) {
            fechaEntrega.setDate(fechaEntrega.getDate() + 1)
        }

        return fechaEntrega
    }


    const form = useForm({
        initialValues: {
            tipoEntrega: '',
            tipoPago: '',
            fechaEntrega: getInitialDate(),
            detalle: cart,
            cliente: {
                dni: '',
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                provincia: '',
                ciudad: '',
                direccion: '',
                codigoPostal: '',
            }
        },
        validate: {
            tipoEntrega: (value) => ['retiro', 'envio'].includes(value) ? null : 'Ingrese un tipo de entrega valida',
            tipoPago: (value) => ['efectivo', 'credito'].includes(value) ? null : 'Ingrese un tipo de pago valido',
            fechaEntrega: (value) => new Date(value) >= new Date(Date.now())  ? null : 'Ingrese un estado valido',
            cliente: {
                dni: (value) => /^\d{7,8}$/.test(value) ? null : 'Ingrese un dni valido',
                nombre: (value) => value.trim().length > 0 ? (value.trim().length <= 50 ? null : 'El nombre es muy largo') : 'Ingrese un nombre',
                apellido: (value) => value.trim().length > 0 ? (value.trim().length <= 50 ? null : 'El nombre es muy largo') : 'Ingrese un apellido',
                email: (value) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Ingrese un email valido',
                telefono: (value) => /^(?:\+54\s?9\s?)(\d{2,4})[\s-]*(\d{2,4})[\s-]*(\d{4})$/.test(value) ? null : 'Ingrese un telefono valido',
                provincia: (value) => provincias.includes(value) ? null : 'Ingrese una provincia valida',
                ciudad: (value) => value.trim().length > 0 ? (value.trim().length <= 50 ? null : 'El nombre es muy largo') : 'Ingrese una ciudad valida',
                direccion: (value) => value.trim().length > 0 ? (value.trim().length <= 100 ? null : 'El nombre es muy largo') : 'Ingrese una direccion valida',
                codigoPostal: (value) => /^[A-Z]\d{4}[A-Z]{3}$|^\d{4}$/.test(value) ? null : 'Ingrese un cod. postal valido',
            }
        },
        validateInputOnChange: true
    })

    const formValues = form.values
    const cliente = formValues.cliente

    return (
        <Container w='70%' fluid mt={20}>
            <form>
                <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false} 
                styles={{stepIcon: {backgroundColor: 'var(--mantine-color-blue-6)', color: 'white'}}}>
                    <Stepper.Step label="Completar datos personales">
                        <Stack w='70%' m='auto' className={styles.mainContainer} gap={25} p={20}>
                            <Group justify='center' mb={-5}>
                                <Title size='h2' fw={600}>DATOS PERSONALES</Title>
                            </Group>

                            <Divider></Divider>

                            <Group justify='space-between'>
                                <TextInput label='DNI' description="Ingrese su DNI" w='15%' {...form.getInputProps('cliente.dni')} h={80}/>
                                <TextInput label='Nombre' description="Ingrese su nombre" w='40%' {...form.getInputProps('cliente.nombre')} h={80}/>
                                <TextInput label='Apellido' description="Ingrese su apellido" w='40%' {...form.getInputProps('cliente.apellido')} h={80}/>
                            </Group>
                            <Group justify='space-between'>
                                <TextInput label='Email' description="Ingrese su email" w='60%' {...form.getInputProps('cliente.email')} h={80}/>
                                <TextInput label='Telefono' description="Ingrese su telefono" w='35%' placeholder='+54 9 [cod. area] [cod. abonado]' 
                                {...form.getInputProps('cliente.telefono')} h={80}/>
                            </Group>
                            <Group justify='space-between'>
                                <Select data={provincias} label='Provincia' description="Ingrese su provincia" w='20%' {...form.getInputProps('cliente.provincia')}
                                rightSectionPointerEvents="none" rightSection={<IconChevronDown size={16}/>} h={90}/>
                                <TextInput label='Ciudad' description="Ingrese su ciudad" w='25%' {...form.getInputProps('cliente.ciudad')} h={90}/>
                                <TextInput label='Direccion' description="Ingrese su direccion" w='25%' {...form.getInputProps('cliente.direccion')} h={90}/>
                                <TextInput label='Codigo Postal' description="Ingrese su codigo postal" w='20%' {...form.getInputProps('cliente.codigoPostal')} h={90}/>
                            </Group>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Completar datos del pedido">
                        <Stack w='70%' m='auto' className={styles.mainContainer} gap={25} p={20}>
                            <Group justify='center' mb={-5}>
                                <Title size='h2' fw={600}>DATOS DEL PEDIDO</Title>
                            </Group>

                            <Divider></Divider>

                            <Card withBorder radius="md" padding="md" 
                            style={{borderLeft: '4px solid var(--mantine-color-blue-6)', backgroundColor: 'var(--mantine-color-body)'}}>
                                <Group>
                                    <Radio.Group name="tipoPago" label="TIPO DE PAGO" description="Seleccionar tipo de pago" {...form.getInputProps('tipoPago')}>
                                        <Group mt="xs">
                                            <Radio value="efectivo" label="EFECTIVO" />
                                            <Radio value="credito" label="CREDITO" />
                                        </Group>
                                    </Radio.Group>
                                </Group>
                            </Card>

                            <Card withBorder radius="md" padding="md" 
                            style={{borderLeft: '4px solid var(--mantine-color-blue-6)', backgroundColor: 'var(--mantine-color-body)'}}>
                                <Radio.Group name="tipoEntrega" label="TIPO DE ENTREGA" description="Seleccionar tipo de entrega" {...form.getInputProps('tipoEntrega')}>
                                    <Group mt="xs">
                                        <Radio value="retiro" label="RETIRO" />
                                        <Radio value="envio" label="ENVIO" />
                                    </Group>
                                </Radio.Group>
                            </Card>

                            <Card withBorder radius="md" padding="md" 
                            style={{borderLeft: '4px solid var(--mantine-color-blue-6)', backgroundColor: 'var(--mantine-color-body)'}}>
                                <Text fw={500} size='sm' mb={2}>FECHA DE ENTREGA</Text>
                                <Text size='xs' c={theme.colors.gray[6]} mb={4}>Seleccionar fecha de entrega (o usar la que esta por defecto)</Text>
                                <DateInput valueFormat="DD/MM/YYYY" minDate={dayjs().add(7, 'days').format('YYYY-MM-DD')} w={125}
                                maxDate={dayjs().add(21, 'days').format('YYYY-MM-DD')} excludeDate={(date) => new Date(date).getDay() === 6} 
                                {...form.getInputProps('fechaEntrega')}/>
                            </Card>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Verificar pedido">
                        <Flex w='100%' gap={25} p={20} justify='center'>
                            <Stack w='40%' justify='flex-start' gap={25}>
                                <Stack className={styles.mainContainer}>
                                    <Group justify='center' mb={-5}>
                                        <Text size='lg' fw={600}>DATOS PERSONALES</Text>
                                    </Group>

                                    <Divider></Divider>

                                    <Stack>
                                        <Stack gap={5}>
                                            <Text fw={500} size='md' mb={2}>Nombre Completo</Text>
                                            <Text size='sm' mb={2}>{cliente.apellido}, {cliente.nombre}</Text>
                                        </Stack>
                                        <Stack gap={5}>
                                            <Text fw={500} size='md' mb={2}>Telefono</Text>
                                            <Text size='sm' mb={2}>{cliente.telefono}</Text>
                                        </Stack>
                                        <Stack gap={5}>
                                            <Text fw={500} size='md' mb={2}>Email</Text>
                                            <Text size='sm' mb={2}>{cliente.email}</Text>
                                        </Stack>
                                        <Stack gap={5}>
                                            <Text fw={500} size='md' mb={2}>Direccion</Text>
                                            <Text size='sm' mb={2}>{cliente.direccion} ({cliente.provincia}, {cliente.ciudad} {cliente.codigoPostal})</Text>
                                        </Stack>
                                    </Stack>
                                </Stack>

                                <Stack className={styles.mainContainer}>
                                    <Group justify='center' mb={-5}>
                                        <Text size='lg' fw={600}>DATOS DEL PEDIDO</Text>
                                    </Group>

                                    <Divider></Divider>
                                    <Stack>
                                        <Stack gap={5}>
                                            <Text fw={500} size='md' mb={2}>Tipo de pago</Text>
                                            <Text size='sm' mb={2}>{capitalize(formValues.tipoPago)}</Text>
                                        </Stack>
                                        <Stack gap={5}>
                                            <Text fw={500} size='md' mb={2}>Tipo de entrega</Text>
                                            <Text size='sm' mb={2}>{capitalize(formValues.tipoEntrega)}</Text>
                                        </Stack>
                                        <Stack gap={5}>
                                            <Text fw={500} size='md' mb={2}>Fecha de entrega</Text>
                                            <Text size='sm' mb={2}>{dayjs(formValues.fechaEntrega).format('DD/MM/YYYY')}</Text>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack w='50%' className={styles.mainContainer} h='100%'>
                                <PedidoResume cart={cart}></PedidoResume>
                            </Stack>
                        </Flex>
                    </Stepper.Step>

                    <Stepper.Completed>
                        <Stack w='40%' className={styles.mainContainer} align='center' m='auto' gap={25} p={20} mt={20}>
                            <Text size='lg' fw={600} mb={-5}>TU PEDIDO HA SIDO RECIBIDO CON EXITO!</Text>

                            <Divider w='100%'></Divider>

                            <Group>
                                <Group w='100%' justify='space-between'>
                                    <Group gap={5}>
                                        <IconLabel size={25}/>
                                        <Text size='md' fw={550}> Numero de pedido:</Text>
                                    </Group>
                                    <Text>[{createdPedido? createdPedido.id : '0000'}]</Text>
                                </Group>
                                <Group w='100%' justify='space-between'>
                                    <Group gap={5}>
                                        <IconCreditCard size={25}/>
                                        <Text size='md' fw={550}> Tipo de pago:</Text>
                                    </Group>
                                    <Text>{createdPedido? createdPedido.tipoPago.toUpperCase() : 'RETIRO'}</Text>
                                </Group>
                                <Group w='100%' justify='space-between'>
                                    <Group gap={5}>
                                        <IconTruck size={25}/>
                                        <Text size='md' fw={550}> Tipo de entrega:</Text>
                                    </Group>
                                    <Text>{createdPedido? createdPedido.tipoEntrega.toUpperCase() : 'EFECTIVO'}</Text>
                                </Group>
                                <Group w='100%' justify='space-between'>
                                    <Group gap={5}>
                                        <IconCalendarClock size={25}/>
                                        <Text size='md' fw={550}> Fecha de entrega:</Text>
                                    </Group>
                                    <Text>{createdPedido? dayjs(createdPedido.fechaEntrega).format('D [de] MMMM, YYYY') : '1 de enero, 2025'}</Text>
                                </Group>
                                <Group w='100%' justify='space-between'>
                                    <Group gap={5}>
                                        <IconCoin size={25}/>
                                        <Text size='md' fw={550}> Total:</Text>
                                    </Group>
                                    <Text>${createdPedido? createdPedido.precioTotal.toLocaleString('es-AR') : '00.000.000'}</Text>
                                </Group>
                            </Group>
                        </Stack>
                    </Stepper.Completed>
                </Stepper>
            </form>

            {active < 3 ? 
            <Group justify="center" mt="xl">
                {active > 0 ? 
                <Button variant="default" onClick={prevStep} leftSection={<IconArrowLeft size={16}/>}>Ir hacia atras</Button>
                :
                <Button onClick={nextStep} color='gray' leftSection={<IconX size={16}/>}>Cancelar compra</Button>
                }
                {active < 2 ? 
                <Button onClick={nextStep} rightSection={<IconArrowRight size={16}/>}>Continuar</Button>
                :
                <Button onClick={onComplete} color='green' rightSection={<IconCheck size={16}/>}>Finalizar compra</Button>
                }
            </Group>
            : 
            <Group justify="center" mt="xl">
                <Button variant="default" component={Link} to='/'>Volver al menu principal</Button>
            </Group>
            }
        </Container>
    )
}