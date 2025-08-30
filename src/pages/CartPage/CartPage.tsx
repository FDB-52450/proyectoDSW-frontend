import { CartContext } from "../../context/CartContext.tsx"
import { useContext } from "react"
import { Container, Divider, Flex, Group, Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"

import { CartList } from "../../components/cart/CartProductList/CartList.tsx"
import { ResumeList } from "./ResumeList/ResumeList.tsx"
import { NoProductsMessage } from "./NoProductsMessage/NoProductsMessage.tsx"

import { IconChevronRight } from "@tabler/icons-react"

export function CartPage() {
    const context = useContext(CartContext)
    
    if (!context) {
        throw new Error("CartContext must be used within a provider")
    }
    
    const {cart} = context

    const isMobile = useMediaQuery('(max-width: 768px)')
    const isLaptop = useMediaQuery('(max-width: 1024px)')

    return (
        <Container w={isLaptop ? (isMobile ? '100%' : '85%') : '70%'} mt={30} fluid>
            <Group>
                <IconChevronRight></IconChevronRight>
                <Text size="xl" fw={550}>Mi carrito</Text>
            </Group>
            <Divider mt={10} mb={20}></Divider>
            {cart.length > 0 ?
            <Flex justify='center' direction={isLaptop ? 'column' : 'row'}>
                <Container w={isLaptop ? '100%' : '70%'}>
                    <CartList></CartList>
                </Container>
                <Container w={isLaptop ? '100%' : '30%'} mt={isLaptop ? 50 : 0}>
                    <ResumeList></ResumeList>
                </Container>
            </Flex> 
            :
            <NoProductsMessage></NoProductsMessage>
            }
        </Container>
    )
}