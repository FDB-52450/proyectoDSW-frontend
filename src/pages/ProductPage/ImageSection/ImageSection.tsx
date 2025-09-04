import styles from './ImageSection.module.css'
import stylesImage from './ActiveImage.module.css'

import { useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'

import { Image, Group} from "@mantine/core"
import { Carousel } from "@mantine/carousel"

import noImage from '../../../assets/noImage.png'

import type { EmblaCarouselType } from 'embla-carousel'
import type { Imagen } from "../../../entities/imagen.ts"

export function ImageSection ({imagenes}: {imagenes: Array<Imagen | null>}) {  
    const [activeSlide, setActiveSlide] = useState(0)
    const [embla, setEmbla] = useState<EmblaCarouselType | null>(null)

    function getImagenUrl(imagen: Imagen | null) {
        if (imagen) {
            const imagenUrl = imagen.url
            return `http://localhost:8080/images/${imagenUrl}/large.webp`
        } else {
            return noImage
        }
    }

    const isMobile = useMediaQuery('(max-width: 1024px)')
    const isSmall = useMediaQuery('(max-width: 400px)')

    const maxMainSize = isMobile ? (isSmall ? 300 : 400) : 500
    const maxSecondarySize = isMobile ? (isSmall ? 70 : 85) : 100

    if (imagenes.length === 0) imagenes = [null]

    const slides = imagenes.map((img: Imagen | null, index: number) => (
        <>
            {(index === 0 || img) ? 
            <Carousel.Slide key={index} style={{alignContent: 'center', justifyItems: 'center'}} mah={maxMainSize}>
                <Image src={getImagenUrl(img)} style={{maxHeight: maxMainSize, maxWidth: maxMainSize, objectFit: 'contain'}} p={25}></Image>
            </Carousel.Slide>
            : null}
        </>
    ))

    return (
        <>
            <Carousel onSlideChange={(index: number) => setActiveSlide(index)} controlSize={30} classNames={styles} 
            emblaOptions={{duration: 30}} getEmblaApi={setEmbla}>
                {slides}
            </Carousel>
            <Group mt={-20} justify='space-between' gap={20}>
                {imagenes.map((img: Imagen | null, index: number) => (
                <>
                    {(index === 0 || img) ? 
                    <a onClick={() => {embla!.scrollTo(index); setActiveSlide(index)}} style={{height: maxSecondarySize, width: maxSecondarySize, justifyItems: 'center', alignContent: 'center'}}
                    className={activeSlide === index ? stylesImage.image : ''}>
                        <Image src={getImagenUrl(img)} style={{maxHeight: maxSecondarySize - 10, maxWidth: maxSecondarySize - 10, objectFit: 'contain'}} p={5}></Image>
                    </a>
                    : null}
                </>
                ))}
            </Group>
        </>
    )
}
