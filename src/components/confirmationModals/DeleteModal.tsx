import { useLocation, useNavigate } from "react-router-dom"

import { deleteMarca } from "../../services/marcaService.ts"
import { deleteCategoria } from "../../services/categoriaService.ts"
import { deleteProduct } from "../../services/productService.ts"

import { Button, Group, Modal, Stack, Text } from "@mantine/core"

import { IconAlertTriangle, IconTrash, IconX } from "@tabler/icons-react"

import type { Producto } from "../../entities/producto.ts"
import type { Marca } from "../../entities/marca.ts"
import type { Categoria } from "../../entities/categoria.ts"

export function DeleteModal({tipo, id, isOpen, setClose}: {tipo: string, id: string, isOpen: boolean, setClose: () => void}) {
    const navigate = useNavigate()
    const location = useLocation()

    const nombreTipo = tipo === 'administradores' ? tipo.slice(0, -2): tipo.slice(0, -1)

    const handleDelete = async () => {
        const deleteMap: Record<string, () => Promise<Producto | Marca | Categoria>> = {
            productos: () => deleteProduct(id),
            marcas: () => deleteMarca(id),
            categorias: async () => deleteCategoria(id),
        }
     
        const deleteFn = deleteMap[tipo]

        await deleteFn()
    }

    return (
        <Modal opened={isOpen} onClose={setClose} overlayProps={{backgroundOpacity: 0.55, blur: 2}} centered size='500px'>
            <Stack align='center' gap={0}>
                <IconAlertTriangle size={75} color='red'></IconAlertTriangle>
                <Text fw={650} mt={20}> Estas seguro que quieres borrar esta {nombreTipo}? </Text>
                <Text> Esta accion no se puede revertir. </Text>
                <Group mt={50}>
                    <Button color='red' leftSection={<IconTrash/>} 
                    onClick={async () => {
                        const fullUrl = location.pathname + location.search
                        const goToURL = `/dashboard/${tipo}`
    
                        setClose()
                        await handleDelete()

                        if (fullUrl === goToURL) {
                            setTimeout(() => {navigate(0)}, 5000)
                        } else {
                            navigate(`/dashboard/${tipo}`, {replace: true})}
                        }}>
                        BORRAR {nombreTipo.toUpperCase()}
                    </Button>
                    <Button color='gray' leftSection={<IconX></IconX>} onClick={setClose}>
                        CANCELAR
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}