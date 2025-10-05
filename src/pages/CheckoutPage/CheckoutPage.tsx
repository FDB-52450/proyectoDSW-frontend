import dayjs from 'dayjs'

import { useContext, useState } from "react"
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useForm } from '@mantine/form'

import { createPedido } from '../../services/pedidoService.ts'
import { fetchStatusCliente } from '../../services/clienteService.ts'

import { CartContext } from "../../context/CartContext.tsx"

import { Link } from 'react-router-dom'
import { Button, Container, Group, Stepper } from "@mantine/core"

import { PersonalDataSection } from './CheckoutSections/PersonalDataSection.tsx'
import { PedidoDataSection } from './CheckoutSections/PedidoDataSection.tsx'
import { PedidoVerificationSection } from './CheckoutSections/PedidoVerificationSection.tsx'
import { PedidoCompletedSection } from './CheckoutSections/PedidoCompletedSection.tsx'

import { BannedModal } from './BannedModal/BannedModal.tsx'

import { IconArrowLeft, IconArrowRight, IconCheck, IconX } from "@tabler/icons-react"

import type { Pedido } from '../../entities/pedido.ts'
import type { ClienteStatus } from '../../entities/clienteStatus.ts'
import type { PedidoProd } from '../../entities/pedidoProd.ts'

const provincias = ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa",
    "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
    "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán", "Ciudad Autonoma de Buenos Aires"
]

export interface FormInterface {
    tipoEntrega: string,
    tipoPago: string,
    fechaEntrega: Date,
    detalle: PedidoProd[],
    cliente: {
        dni: string,
        nombre: string,
        apellido: string,
        email: string,
        telefono: string,
        provincia: string,
        ciudad: string,
        direccion: string,
        codigoPostal: string,
    }
}

export function CheckoutPage() {
    const [active, setActive] = useState(0)
    const context = useContext(CartContext)

    const [createdPedido, setCreatedPedido] = useState<Pedido>()
    const [status, setStatus] = useState<ClienteStatus | null>(null)
    const [opened, { open, close }] = useDisclosure(false)
    
    if (!context) {
        throw new Error("CartContext must be used within a provider")
    }
    
    const {cart, setCart} = context

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))
    const nextStep = async () => {
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
                if (active === 0) {
                    const status: ClienteStatus = await fetchStatusCliente(formValues.cliente)

                    if (status.banned) {
                        setStatus(status)
                        open()
                        return 
                    }
                }
                setActive((current) => (current + 1))
            } 
        }

        if (active === 2) {
            setActive((current) => (current + 1))
        }
    }

    async function onComplete() {
        console.log(formValues, formValues.fechaEntrega)
        const response = await createPedido(formValues as Partial<Pedido>)

        setCreatedPedido(response)
        nextStep()
        setCart([])
    }

    function getInitialDate(): Date {
        let fechaEntrega = dayjs().add(7, 'day');

        if (fechaEntrega.day() === 0) {
            fechaEntrega = fechaEntrega.add(1, 'day');
        }

        return fechaEntrega.startOf('day').toDate()
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

    const isMobile = useMediaQuery('(max-width: 768px)')
    const isLaptop = useMediaQuery('(max-width: 1024px)')

    return (
        <Container w={isMobile ? '100%' : (isLaptop ? '90%' : '70%')} fluid mt={20}>
            <BannedModal clienteStatus={status} isOpen={opened} setClose={close}></BannedModal>
            <form>
                <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false} orientation={isMobile ? 'vertical' : 'horizontal'} radius='md' mt={50}
                styles={{stepIcon: {backgroundColor: 'var(--mantine-color-blue-6)', color: 'white'}, content: {marginTop: '40px'}}}>
                    <Stepper.Step label="Completar datos personales">
                        <PersonalDataSection form={form}></PersonalDataSection>
                    </Stepper.Step>

                    <Stepper.Step label="Completar datos del pedido">
                        <PedidoDataSection form={form}></PedidoDataSection>
                    </Stepper.Step>

                    <Stepper.Step label="Verificar pedido">
                        <PedidoVerificationSection form={form} cart={cart}></PedidoVerificationSection>
                    </Stepper.Step>

                    <Stepper.Completed>
                        <PedidoCompletedSection createdPedido={createdPedido}></PedidoCompletedSection>
                    </Stepper.Completed>
                </Stepper>
            </form>

            {active < 3 ? 
            <Group justify="center" mt="xl">
                {active > 0 ? 
                <Button variant="default" onClick={prevStep} leftSection={<IconArrowLeft size={16}/>}>Ir hacia atras</Button>
                :
                <Button color='gray' leftSection={<IconX size={16}/>} component={Link} to='/carrito'>Cancelar compra</Button>
                }
                {active < 2 ? 
                <Button onClick={nextStep} disabled={status ? status.banned : false} rightSection={<IconArrowRight size={16}/>}>Continuar</Button>
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