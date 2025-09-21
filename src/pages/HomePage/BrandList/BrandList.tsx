import styles from './BrandList.module.css'

import { Button,  Grid, Group, Image} from "@mantine/core";
import type { Marca } from "../../../entities/marca.ts";

import noImage from '../../../assets/noImage.png'
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';

export function BrandList({marcas}: {marcas: Marca[]}) {
    const navigate = useNavigate()
    
    const isSmallMobile = useMediaQuery('(max-width: 425px)')
    const isTablet = useMediaQuery('(max-width: 1024px)')

    const size = isSmallMobile ? 130 : (isTablet ? 150 : 200)
    
    return (
        <Grid gutter='sm'>
            {marcas.slice(0, 12).map((marca) => {
                if (marca.imagen) {
                    return (
                    <Grid.Col span={isTablet ? (isSmallMobile ? 6: 3): 2}>
                        <Button w='100%' h={size} variant='default' className={styles.img} onClick={() => navigate(`/productos?marca=${marca.nombre}`)}>
                            <Group m={isSmallMobile ? 10: 20}>
                                <Image src={marca.imagen ? `http://localhost:8080/images/${marca.imagen.url}/medium.webp` : noImage} alt='Imagen de marca'
                                style={{maxHeight: size, maxWidth: size, objectFit: 'contain'}}></Image> 
                            </Group>
                        </Button>
                    </Grid.Col> 
                    )
                }
            })}
        </Grid>
    )
}