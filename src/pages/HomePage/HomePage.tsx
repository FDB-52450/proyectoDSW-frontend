import { useEffect, useState } from "react"
import { useMediaQuery } from '@mantine/hooks'

import { fetchProducts } from "../../services/productService.ts"
import { fetchMarcas } from '../../services/marcaService.ts'

import { BrandList } from './BrandList/BrandList.tsx'
import { CategoriaList } from './CategoriaList/CategoriaList.tsx'
import { ProductCarousel } from "../../components/product/ProductCarousel/ProductCarousel.tsx"

import { Container, Image,  Stack, Text} from '@mantine/core'

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

    if (loading) return (<></>)
    if (error) return (<></>)

    return (
        <>
            <Image src='/src/assets/testBanner.webp' alt='IMAGEN PUBLICITARIA'></Image>
            <Container size={isLargeLaptop ? (isLaptop ? (isMobile ? '95%' : '90%') : '81%') : '70%'}>
                <Stack justify='flex-start'>
                    <Text size='25px' mt={50}> PRODUCTOS DESTACADOS </Text>
                    <ProductCarousel products={featuredProducts}></ProductCarousel>

                    <Text size='25px' mt={50}> CATEGORIAS </Text>
                    <CategoriaList/>

                    <Text size='25px' mt={50}> PRODUCTOS REBAJADOS </Text>
                    <ProductCarousel products={discountedProducts}></ProductCarousel>

                    <Text size='25px' mt={50}> MARCAS </Text>
                    <BrandList marcas={marcas}></BrandList>
                </Stack>
            </Container>
        </>
    )
}