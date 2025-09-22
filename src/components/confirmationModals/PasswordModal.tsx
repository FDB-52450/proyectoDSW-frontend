import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react";

import { updateAdmin } from "../../services/adminService.ts";

import { Button, Group, Modal, PasswordInput, Stack, Text} from "@mantine/core"

import { IconHelpHexagon, IconLock, IconX } from "@tabler/icons-react"

export function PasswordModal({id, isOpen, setClose}: {id: string, isOpen: boolean, setClose: () => void}) {
    const navigate = useNavigate()
    const location = useLocation()

    const [contra, setContra] = useState<string>('')

    return (
        <Modal opened={isOpen} onClose={setClose} overlayProps={{backgroundOpacity: 0.55, blur: 2}} centered size='30%'>
            <Stack align='center' gap={0}>
                <IconHelpHexagon size={75}/>
                <Text fw={650} mt={20}> CAMBIAR CONTRASEÑA </Text>
                <PasswordInput label="Nueva contraseña" value={contra} onChange={(e) => setContra(e.currentTarget.value)} required w='50%' mt={20}/>
                <Group mt={50}>
                    <Button color='yellow' leftSection={<IconLock/>} 
                    onClick={async () => {
                        const fullUrl = location.pathname + location.search
                        const goToURL = '/dashboard/administradores'
    
                        setClose()
                        await updateAdmin(id, {password: contra})

                        if (fullUrl === goToURL) {
                            setTimeout(() => {navigate(0)}, 2500)
                        } else {
                            navigate('/dashboard/administradores', {replace: true})}
                        }}>
                        GUARDAR NUEVA CONTRASEÑA
                    </Button>
                    <Button color='gray' leftSection={<IconX></IconX>} onClick={setClose}>
                        CANCELAR
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}