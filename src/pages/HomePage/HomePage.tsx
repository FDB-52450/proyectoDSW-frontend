import { useEffect, useState } from "react"
import { useMediaQuery } from '@mantine/hooks'

import { fetchProducts } from "../../services/productService.ts"
import { fetchMarcas } from '../../services/marcaService.ts'

import { Anchor, Box, Button, Container, Group, Image,  LoadingOverlay,  Stack, Text} from '@mantine/core'
import { Link } from "react-router-dom"

import { BrandList } from './BrandList/BrandList.tsx'
import { CategoriaList } from './CategoriaList/CategoriaList.tsx'
import { ProductCarousel } from "../../components/product/ProductCarousel/ProductCarousel.tsx"

import { IconChevronRight } from "@tabler/icons-react"

import type { Producto } from "../../entities/producto.ts"
import type { Marca } from '../../entities/marca.ts'

export function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState<Producto[]>([])
    const [discountedProducts, setDiscountedProducts] = useState<Producto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [marcas, setMarcas] = useState<Marca[]>([])

    useEffect(() => {
        setLoading(true)
        setError(null)

        fetchProducts({ destacado: true, page: 1}, true)
        .then((res) => {
            setFeaturedProducts(res.data)
        })
        .catch((err) => {
            setError(err.message)
        })
        .finally(() => {
            setLoading(false)
        })

        fetchProducts({ descontado: true, page: 1}, true)
        .then((res) => {
            setDiscountedProducts(res.data)
        })
        .catch((err) => {
            setError(err.message)
        })
        .finally(() => {
            setLoading(false)
        })

        fetchMarcas()
        .then((res) => {
            setMarcas(res.data)
        })
        .catch((err) => {
            setError(err.message)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    const isLargeLaptop = useMediaQuery('(max-width: 1440px)')
    const isLaptop = useMediaQuery('(max-width: 1024px)')
    const isMobile = useMediaQuery('(max-width: 768px)')

    if (error) return (<></>)

    return (
        <>
            <LoadingOverlay visible={loading} loaderProps={{size: '100px'}}></LoadingOverlay>
            <Image src='/src/assets/testBanner.webp' alt='IMAGEN PUBLICITARIA'></Image>
            <Container size={isLargeLaptop ? (isLaptop ? (isMobile ? '95%' : '90%') : '81%') : '70%'}>
                <Stack justify='flex-start'>
                    <Text size='25px' mt={50}> PRODUCTOS DESTACADOS </Text>
                    <ProductCarousel products={featuredProducts}></ProductCarousel>

                    <Box pos="relative" h={isMobile ? 175 : 325} w='100%' mt={50}>
                        <Image src="src\assets\categoriaImages\memoriasRam.webp" alt={'categoria'} w="100%" h='100%'
                        radius='lg' fit="cover" style={{ objectPosition: '55% 10%', opacity: 0.95}}/>
                        <Stack pos='absolute' top="15%" left={isMobile ? '5%' : '3%'} align="left">
                            <Text c='white' size={isMobile ? '20px' : '35px'}>Memorias RAM</Text>
                            <Text c='white' size={isMobile ? 'xs' : 'md'}>Velocidad que no se detiene.</Text>
                            <Button variant="default" rightSection={<IconChevronRight size={isMobile ? 12 : 15}/>} size={isMobile ? 'xs' : 'md'} 
                            w={isMobile ? '100px' : '200px'} mt={isMobile ? 25 : 100} component={Link} to='/productos?categoria=memorias+ram'>
                                Ver mas
                            </Button>
                        </Stack>
                        <Text pos='absolute' bottom='3%' right='1%' c='white' size={isMobile ? '6px' : '10px'} opacity={0.5}>
                            Foto de{' '} 
                            <Anchor href="https://unsplash.com/es/@vitalysacred?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                            Vitaly Sacred{' '}
                            </Anchor> 
                            en {' '}
                            <Anchor href="https://unsplash.com/es/fotos/un-primer-plano-de-una-computadora-y-cables-en-una-habitacion-oscura-7Rhal4dap78?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                            Unsplash.
                            </Anchor>
                        </Text>
                    </Box>
                          
                    <Text size='25px' mt={50}> CATEGORIAS </Text>
                    <CategoriaList/>
                    <Group justify="flex-end">
                        <Text size='10px' component='a' opacity={0.5}>
                        Iconos hechos por {' '} 
                            <Anchor href='https://www.freepik.com/author/j703'>
                                J703 (Freepik)
                            </Anchor>
                        </Text>
                    </Group>
              
                    <Box pos="relative" h={isMobile ? 175 : 325} w='100%' mt={50}>
                        <Image src="src\assets\categoriaImages\tarjetasGraficas.webp" alt={'categoria'} w="100%" h={isMobile ? 175 : 325}
                        radius='lg' fit="cover"style={{ objectPosition: '55% 75%', opacity: 0.95}}/>
                        <Stack pos='absolute' top="15%" right={isMobile ? '5%' : '3%'} align="flex-end">
                            <Text c='white' size={isMobile ? '20px' : '35px'}>Tarjetas graficas</Text>
                            <Text c='white' size={isMobile ? 'xs' : 'md'}>La fuerza detrás de cada pixel.</Text>
                            <Button variant="default" rightSection={<IconChevronRight size={isMobile ? 12 : 15}/>} size={isMobile ? 'xs' : 'md'}
                            w={isMobile ? '100px' : '200px'} mt={isMobile ? 25 : 100} component={Link} to='/productos?categoria=tarjetas+graficas'>
                                Ver mas
                            </Button>
                        </Stack>
                        <Text pos='absolute' bottom='3%' left='1%' c='white' size={isMobile ? '6px' : '10px'} opacity={0.5}>
                            Foto de{' '}
                            <Anchor href="https://unsplash.com/es/@sdlsanjaya?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                            sdl sanjaya{' '}
                            </Anchor> 
                            en {' '}
                            <Anchor href="https://unsplash.com/es/fotos/un-primer-plano-de-la-placa-base-de-una-computadora-con-dos-ventiladores-fHwHwYL_EwY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                            Unsplash.
                            </Anchor>
                        </Text>
                    </Box>

                    <Text size='25px' mt={50}> PRODUCTOS REBAJADOS </Text>
                    <ProductCarousel products={discountedProducts}></ProductCarousel>

                    <Box pos="relative" h={isMobile ? 175 : 325} w='100%' mt={50}>
                        <Image src="src\assets\categoriaImages\gabinetes.webp" alt={'categoria'} w="100%" h={isMobile ? 175 : 325}
                        radius='lg' fit="cover"style={{ objectPosition: '55% 30%', opacity: 0.95}}/>
                        <Stack pos='absolute' top="15%" left={isMobile ? '5%' : '3%'} align="left">
                            <Text c='white' size={isMobile ? '20px' : '35px'}>Gabinetes</Text>
                            <Text c='white' size={isMobile ? 'xs' : 'md'}>El hogar ideal para tu hardware.</Text>
                            <Button variant="default" rightSection={<IconChevronRight size={isMobile ? 12 : 15}/>} size={isMobile ? 'xs' : 'md'}
                            w={isMobile ? '100px' : '200px'} mt={isMobile ? 25 : 100} component={Link} to='/productos?categoria=gabinetes'>
                                Ver mas
                            </Button>
                        </Stack>
                        <Text pos='absolute' bottom='3%' right='1%' c='white' size={isMobile ? '6px' : '10px'} opacity={0.5}>
                            Foto de {' '}
                            <Anchor href="https://unsplash.com/es/@gamercomp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                            GAMERCOMP.RU{' '}
                            </Anchor> 
                            en {' '}
                            <Anchor href="https://unsplash.com/es/fotos/una-torre-de-computacion-con-un-ventilador-verde-brillante-62KaT6SMsK8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                            Unsplash.
                            </Anchor>
                        </Text>   
                    </Box>

                    <Text size='25px' mt={50}> MARCAS </Text>
                    <BrandList marcas={marcas}></BrandList>
                </Stack>
            </Container>
        </>
    )
}