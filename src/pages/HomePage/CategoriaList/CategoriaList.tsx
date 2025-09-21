import styles from './CategoriaList.module.css'

import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@mantine/hooks";

import { Button,  Grid, Image, Stack, Text} from "@mantine/core";

const categorias = [
    {value: 'procesadores', nombre: 'Procesadores', icon: 'processor'},
    {value: 'tarjetas graficas', nombre: 'Placas de video', icon: 'graphicCard'},
    {value: 'placas madre', nombre: 'Motherboards', icon: 'motherboard'},
    {value: 'memorias ram', nombre: 'Memorias RAM', icon: 'ram'},
    {value: 'almacenamiento', nombre: 'Almacenamiento', icon: 'hardDisk'},
    {value: 'fuentes de poder', nombre: 'Fuente de poder', icon: 'powerSupply'},
    {value: 'gabinetes', nombre: 'Gabinetes', icon: 'computerTower'},
    {value: 'refrigeracion', nombre: 'Refrigeracion', icon: 'fan'},
    {value: 'teclados', nombre: 'Teclados', icon: 'keyboard'},
    {value: 'mouses', nombre: 'Mouses', icon: 'mouse'},
    {value: 'auriculares', nombre: 'Auriculares', icon: 'headphone'},
    {value: 'microfonos', nombre: 'Microfonos', icon: 'microphone'},
]

export function CategoriaList() {
    const navigate = useNavigate()

    const isSmallMobile = useMediaQuery('(max-width: 425px)')
    const isTablet = useMediaQuery('(max-width: 1024px)')

    const buttonSize = isSmallMobile ? 130 : (isTablet ? 150 : 200)
    const imageSize = isSmallMobile ? 40 : (isTablet ? 50 : 60)
    const textSize = isSmallMobile ? 'xs' : (isTablet ? 'sm' : 'md')

    return (
        <Grid gutter='sm'>
            {categorias.map((categ) => (
                <Grid.Col span={isTablet ? (isSmallMobile ? 6: 3): 2}>
                    <Button w='100%' h={buttonSize} variant='default' onClick={() => navigate(`/productos?categoria=${categ.value}`)} className={styles.button}>
                        <Stack align="center">
                            <Image src={`src/assets/icons/${categ.icon}.png`} alt='Imagen de marca'
                            style={{maxHeight: imageSize, maxWidth: imageSize, objectFit: 'contain'}}></Image>
                            <Text variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }} size={textSize} fw={500}>{categ.nombre}</Text>
                        </Stack>
                    </Button>
                </Grid.Col> 
            ))}
        </Grid>
    )
}