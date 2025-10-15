import styles from './BrandList.module.css'

import { Button,  Grid, Group, Image, Stack, Text} from "@mantine/core"
import type { Marca } from "../../../entities/marca.ts"

import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from '@mantine/hooks'
import { IconPhoto } from '@tabler/icons-react'

export function BrandList({marcas}: {marcas: Marca[]}) {
    const navigate = useNavigate()
    
    const isSmallMobile = useMediaQuery('(max-width: 425px)')
    const isTablet = useMediaQuery('(max-width: 1024px)')

    const size = isSmallMobile ? 130 : (isTablet ? 150 : 200)
    const textSize = isSmallMobile ? '15px' : (isTablet ? '20px' : '18px')
    
    return (
        <Grid gutter='sm'>
            {marcas.slice(0, 12).map((marca) => (
                <Grid.Col span={isTablet ? (isSmallMobile ? 6: 3): 2}>
                    <Button w='100%' h={size} variant='default' className={styles.img} onClick={() => navigate(`/productos?marca=${marca.nombre}`)}>
                        <Group m={isSmallMobile ? 10: 20}>
                            {marca.imagen ? 
                            <Image src={`http://localhost:8080/images/${marca.imagen.url}/medium.webp`} alt={marca.nombre}
                            style={{maxHeight: size, maxWidth: size, objectFit: 'contain'}}></Image> 
                            :
                            <Stack gap={5} align='center'>
                                <IconPhoto color='gray' size={75} stroke={0.75}></IconPhoto>
                                {marca.nombre.split(' ').map((line) => (
                                    <Text title='No hay imagen disponible' fw={475} size={textSize} c='dimmed'>
                                        {line.toUpperCase()}
                                    </Text>
                                ))}
                            </Stack>
                            }
                        </Group>
                    </Button>
                </Grid.Col>
                )
            )}
        </Grid>
    )
}