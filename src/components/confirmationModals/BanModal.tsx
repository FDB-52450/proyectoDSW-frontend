import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react";

import { reactivateCliente, suspendCliente } from "../../services/clienteService.ts"

import { Button, Group, Modal, Select, Stack, Text, TextInput } from "@mantine/core"

import { IconHelpHexagon, IconLock, IconLockOpen, IconX } from "@tabler/icons-react"

const durations = [
    { value: '1', label: '1 día' },
    { value: '3', label: '3 días' },
    { value: '7', label: '1 semana' },
    { value: '14', label: '2 semanas' },
    { value: '30', label: '1 mes' },
    { value: '-1', label: 'Permanente' },
];

export function BanModal({accion, id, isOpen, setClose}: {accion: string, id: string, isOpen: boolean, setClose: () => void}) {
    const navigate = useNavigate()
    const location = useLocation()

    const [value, setValue] = useState<string | null>(null)
    const [razon, setRazon] = useState<string>('')

    return (
        <Modal opened={isOpen} onClose={setClose} overlayProps={{backgroundOpacity: 0.55, blur: 2}} centered size='26%'>
            <Stack align='center' gap={0}>
                <IconHelpHexagon size={75}/>
                <Text fw={650} mt={20}>{accion === 'suspender' ? 'SUSPENDER': 'REACTIVAR'} CLIENTE </Text>
                {accion === 'suspender' ? 
                <Group mt={20} justify="space-between">
                    <Select label="Duración" data={durations} value={value} onChange={setValue} required w={150}/>
                    <TextInput label="Razon" value={razon} onChange={(e) => setRazon(e.currentTarget.value)} required/>
                </Group>
                :
                <Text>Estas seguro que quieres reactivar este cliente? </Text>}
                <Group mt={50}>
                    <Button color={accion === 'suspender' ? 'red' : 'green'} leftSection={accion === 'suspender' ? <IconLock/> : <IconLockOpen/>}
                    disabled={accion === 'suspender' ? (!value || !razon) : false} onClick={async () => {
                        const fullUrl = location.pathname + location.search
                        const goToURL = '/dashboard/clientes'
    
                        setClose()

                        if (accion === 'suspender' && value != null && razon != null) {
                            const duracion = value === '-1' ? null : parseInt(value, 10);
                            await suspendCliente(id, duracion, razon)
                        } else {
                            await reactivateCliente(id)
                        }

                        if (fullUrl === goToURL) {
                            setTimeout(() => {navigate(0)}, 2500)
                        } else {
                            navigate('/dashboard/clientes', {replace: true})}
                        }}>
                        {accion === 'suspender' ? 'SUSPENDER': 'REACTIVAR'} CLIENTE
                    </Button>
                    <Button color='gray' leftSection={<IconX></IconX>} onClick={setClose}>
                        CANCELAR
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}