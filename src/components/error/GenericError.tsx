import classes from './GenericError.module.css'

import { Container, Text, Title } from '@mantine/core'

export function GenericError() {
    return (
        <Container className={classes.root}>
            <div className={classes.label}>500</div>
            <Title className={classes.title}>Error</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                Ha ocurrido un error inesperado, intente de nuevo mas tarde.
            </Text>
        </Container>
    )
}