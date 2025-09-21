import { useMediaQuery } from '@mantine/hooks'
import { useRef } from 'react'

import Autoplay from 'embla-carousel-autoplay'

import { Carousel } from '@mantine/carousel'

import { ProductCard } from '../ProductCard/ProductCard.tsx'

import type { Producto } from '../../../entities/producto.ts'

export function ProductCarousel({products}: {products: Producto[]}) {   
    const autoplay = useRef(Autoplay({ delay: 5000 }))

    const isSmallMobile = useMediaQuery('(max-width: 425px)')
    const isTablet = useMediaQuery('(max-width: 768px)')

    return (
        <Carousel slideSize={isTablet ? (isSmallMobile ? "100%" : "33%"): "20%"} slideGap="md" withControls={products.length > 5}
        plugins={[autoplay.current]} onMouseEnter={autoplay.current.stop} onMouseLeave={() => autoplay.current.play()} height={440}
        emblaOptions={{loop: true}}>
            {products.map((product, index) => (
                <Carousel.Slide key={index} style={{top: '3px'}}>
                    <ProductCard product={product} />
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}
