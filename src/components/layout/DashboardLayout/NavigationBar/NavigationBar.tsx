import styles from './NavigationBar.module.css'

import { Group, Image, Anchor } from '@mantine/core'

import logo from '../../../../assets/logoPagina.png'

import type { User } from '../../../../entities/user.ts';
import { UserSection } from './UserSection/UserSection.tsx';

export function NavigationBar({user}: {user: User}) {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Group wrap='nowrap' justify='space-between' w='100%'>
                        <Anchor href="/" rel="noopener noreferrer">
                            <Image src={logo} alt='IMAGEN DE LOGO' h={60} radius='md'></Image>
                        </Anchor>
                        <UserSection user={user}></UserSection>
                    </Group>
                </div>
            </header>
        </>
    )
}