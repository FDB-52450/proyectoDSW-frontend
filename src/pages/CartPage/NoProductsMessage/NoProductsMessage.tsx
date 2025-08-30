import { Container, Text, Title } from '@mantine/core';
import classes from './NoProductsMessage.module.css';

export function NoProductsMessage() {
    return (
        <Container className={classes.root}>
            <Title className={classes.title}>Tu carrito no tiene productos!</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                Qué pena, ¿estás seguro que no quieres comprar nada?
            </Text>
        </Container>
    )
}