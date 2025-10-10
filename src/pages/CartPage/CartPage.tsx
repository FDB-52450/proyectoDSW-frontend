import { CartContext } from "../../context/CartContext.tsx"
import { useContext, useEffect, useState } from "react"
import { Alert, Container, Divider, Flex, Group, Loader, Stack, Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

import { CartList } from "../../components/cart/CartProductList/CartList.tsx"
import { ResumeList } from "./ResumeList/ResumeList.tsx"
import { NoProductsMessage } from "./NoProductsMessage/NoProductsMessage.tsx"

import { IconAlertTriangle, IconChevronRight } from "@tabler/icons-react"
import type { Categoria } from "../../entities/categoria.ts"
import { fetchCategorias } from "../../services/categoriaService.ts"

interface ValidationError {
    key: string
    message: string
}

export function CartPage() {
    const context = useContext(CartContext)

    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
    
    if (!context) {
        throw new Error("CartContext must be used within a provider")
    }
    
    const {cart} = context

    useEffect(() => {
        setLoading(true)

        fetchCategorias()
            .then((res) => {
                setCategorias(res.data)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const addOrRemoveError = (key: string, message: string, shouldShow: boolean) => {
        setValidationErrors(prevErrors => {
            const exists = prevErrors.some(err => err.key === key)

            if (shouldShow && !exists) {
                return [...prevErrors, { key, message }]
            }

            if (!shouldShow && exists) {
                return prevErrors.filter(err => err.key !== key)
            }

            return prevErrors
        })
    }

    useEffect(() => {
        if (categorias.length == 0) return

        const categoriaMap = new Map<number, Categoria>()
        categorias.forEach(cat => categoriaMap.set(cat.id, cat))

        const groupedByCategoria = cart.reduce<{[key: number]: number}>((acc, pedProd) => {
            const categoriaId = pedProd.producto.categoria.id;

            if (!acc[categoriaId]) {
                acc[categoriaId] = 0
            }

            acc[categoriaId] += pedProd.cantidad

            return acc
        }, {})

        Object.entries(groupedByCategoria).forEach(([catId, cantidadTotal]) => {
            const categ = categoriaMap.get(Number(catId))

            if (!categ) {
                throw new Error(`Categoria con ID ${catId} no encontrado`)
            }

            const exceeds = cantidadTotal > categ.stockLimit
            const key = `Categoria: ${catId}`
            const message = `Se ha excedido el límite para la categoría "${categ.nombre}" [${categ.stockLimit} unidades por compra]`

            addOrRemoveError(key, message, exceeds)
        })
    }, [cart, categorias])

    const isMobile = useMediaQuery('(max-width: 768px)')
    const isLaptop = useMediaQuery('(max-width: 1024px)')
    const isLargeLaptop = useMediaQuery('(max-width: 1440px)')

    return (
        <Container w={isMobile ? '100%' : (isLaptop ? '90%' : (isLargeLaptop ? '85%' : '70%'))} mt={30} fluid>
            <Group>
                <IconChevronRight></IconChevronRight>
                <Text size="xl" fw={550}>Mi carrito</Text>
            </Group>
            <Divider mt={10} mb={20}></Divider>
            {cart.length > 0 ?
            <Flex justify='center' direction={isLaptop ? 'column' : 'row'}>
                {loading ? 
                <Loader mt={150} size={100} mb={150}></Loader> 
                :
                <>
                {error ? 
                <Stack align="center" gap={10} mt={100} mb={100}>
                    <IconAlertTriangle color='grey' size={65}></IconAlertTriangle>
                    <Text c='grey' size='xl'>
                        Ha ocurrido un error cargando el carrito, intente de nuevo mas tarde.
                    </Text>
                </Stack>
                :
                <>
                    <Container w={isLaptop ? '100%' : '70%'}>
                        <CartList></CartList>
                        {validationErrors.length > 0 ? 
                        <Alert mt={25} variant='filled' color='red' title='No se puede finalizar la compra:' icon={<IconAlertTriangle size={40}/>}>
                            {validationErrors.map((err) => (<Text>- {err.message}</Text>))}
                        </Alert>
                        : null
                        }
                    </Container>
                    <Container w={isLaptop ? '100%' : '30%'} mt={isLaptop ? 50 : 0}>
                        <ResumeList disabled={validationErrors.length > 0}></ResumeList>
                    </Container>
                </>
                }
                </>
                }
            </Flex> 
            :
            <NoProductsMessage></NoProductsMessage>
            }
        </Container>
    )
}