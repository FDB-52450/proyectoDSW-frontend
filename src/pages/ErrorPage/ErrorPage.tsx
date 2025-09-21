import { Container, Text, Title } from '@mantine/core';
import classes from './ErrorPage.module.css';

export function ErrorPage() {
    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>Pagina no encontrada.</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                No se ha encontrado la pagina especificada.
            </Text>
        </Container>
    )
}