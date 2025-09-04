import { Container, Text, Title } from '@mantine/core';
import classes from './NotFoundError.module.css';

export function NotFoundError({prodId}: {prodId: string}) {
    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>Producto no encontrado.</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                No se ha encontrado el producto con id {prodId}.
            </Text>
        </Container>
    )
}