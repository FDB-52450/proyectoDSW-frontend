import styles from './NavigationBar.module.css'

import { Group, Image, Anchor } from '@mantine/core'

import logo from '../../../../assets/logoPagina.png'

export function NavigationBar() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Group wrap='nowrap'>
                        <Anchor href="/" rel="noopener noreferrer">
                            <Image src={logo} alt='IMAGEN DE LOGO' h={60} radius='md'></Image>
                        </Anchor>
                    </Group>
                </div>
            </header>
        </>
    )
}