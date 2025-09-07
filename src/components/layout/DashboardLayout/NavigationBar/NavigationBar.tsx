import styles from './NavigationBar.module.css'

import { useNavigate } from 'react-router-dom';

import { logout } from '../../../../services/adminService.ts';

import { Group, Image, Anchor, Button } from '@mantine/core'

import logo from '../../../../assets/logoPagina.png'

export function NavigationBar() {
    const navigate = useNavigate()

    return (
        <>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Group wrap='nowrap' justify='space-between' w='100%'>
                        <Anchor href="/" rel="noopener noreferrer">
                            <Image src={logo} alt='IMAGEN DE LOGO' h={60} radius='md'></Image>
                        </Anchor>
                        <Button variant='outline' color='white' className={styles.button} onClick={() => {logout(); navigate('/', {replace: true})}}> 
                            Cerrar sesion 
                        </Button>
                    </Group>
                </div>
            </header>
        </>
    )
}