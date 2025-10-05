import { Button, Modal, Stack, Text } from "@mantine/core"

import { IconCheck, IconSquareRoundedX } from "@tabler/icons-react"
import dayjs from "dayjs"
import type { ClienteStatus } from "../../../entities/clienteStatus.ts"

interface BannedModalProps {
    clienteStatus: ClienteStatus | null
    isOpen: boolean, 
    setClose: () => void
}


export function BannedModal({clienteStatus, isOpen, setClose}: BannedModalProps) {
    if (!clienteStatus) {
        return null
    }

    const duracionBan = clienteStatus.banEnd ? dayjs(clienteStatus.banEnd).diff(clienteStatus.banStart, 'day') : Infinity
    const duracionMessage = duracionBan != Infinity ? `${duracionBan} dias` : '[Permanente]'

    return (
        <Modal opened={isOpen} onClose={setClose} overlayProps={{backgroundOpacity: 0.55, blur: 2}} centered size='26%'>
            <Stack align='center' gap={5}>
                <IconSquareRoundedX color='red' size={75}/>
                <Text fw={650} mt={20} size='xl'> CLIENTE BLOQUEADO </Text>
                <Text size='md' ta='center'> El cliente ingresado esta bloqueado en el sistema debido a infracciones previas. </Text>
                <Text size='md' fw={550} mt={10}> Duracion de bloqueo: {duracionMessage} </Text>
                {duracionBan != Infinity ? <Text size='sm'>[Finaliza el {dayjs(clienteStatus.banEnd).format('D [de] MMMM, YYYY')}]</Text>: null}
                <Text size='md' ta='center' mt={10}> Si considera que esto es un error, comuniquese con la administracion del sistema. </Text>
                <Button color='gray' leftSection={<IconCheck/>} onClick={setClose} mt={20}>
                    ACEPTAR
                </Button>
            </Stack>
        </Modal>
    )
}