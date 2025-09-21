import { useLocation, useNavigate } from "react-router-dom"

import { Button, Group, Modal, Stack, Text } from "@mantine/core"

import { updatePedido } from "../../services/pedidoService.ts"

import { IconCheck, IconHelpHexagon, IconX } from "@tabler/icons-react"

export function PedidoModal({estadoNuevo, id, isOpen, setClose}: {estadoNuevo: string, id: string, isOpen: boolean, setClose: () => void}) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Modal opened={isOpen} onClose={setClose} overlayProps={{backgroundOpacity: 0.55, blur: 2}} centered size='26%'>
            <Stack align='center' gap={0}>
                <IconHelpHexagon size={75}/>
                <Text fw={650} mt={20}> Estas seguro que quieres {estadoNuevo === 'confirmado' ? 'confirmar': 'cancelar'} este pedido? </Text>
                <Text> Esta accion no se puede revertir. </Text>
                <Group mt={50}>
                    <Button color={estadoNuevo === 'confirmado' ? 'green' : 'red'} leftSection={estadoNuevo === 'confirmado' ? <IconCheck/> : <IconX/>}
                    onClick={async () => {
                        const fullUrl = location.pathname + location.search
                        const goToURL = '/dashboard/pedidos'
    
                        setClose()
                        await updatePedido(id, {estado: estadoNuevo})

                        if (fullUrl === goToURL) {
                            setTimeout(() => {navigate(0)}, 5000)
                        } else {
                            navigate('/dashboard/pedidos', {replace: true})}
                        }}>
                        {estadoNuevo === 'confirmado' ? 'CONFIRMAR': 'CANCELAR'} PEDIDO
                    </Button>
                    <Button color='gray' leftSection={<IconX></IconX>} onClick={setClose}>
                        CANCELAR
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}