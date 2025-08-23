import { Container, Text, Title } from '@mantine/core';
import classes from './NotFoundError.module.css';

export function NotFoundError() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>No hay productos.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        No se han encontrado productos para la busqueda solicitida.
      </Text>
    </Container>
  );
}