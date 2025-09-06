import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconHelp } from '@tabler/icons-react';
import { ActionIcon, Button, Container, Group, Image, Text } from '@mantine/core';
import logo from '../../../../assets/logoPagina.png'
import classes from './Footer.module.css';
import { ContactList } from './ContactList/ContactList.tsx';

export function Footer() {
    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Image src={logo}/>
                </div>
                <Button component='a' href='/preguntas-frecuentes'
                mt={20} leftSection={<IconHelp size={18}></IconHelp>}>Preguntas frecuentes</Button>
                <ContactList></ContactList>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">© 2025 TechNexus - Todos los derechos reservados.</Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    )
}