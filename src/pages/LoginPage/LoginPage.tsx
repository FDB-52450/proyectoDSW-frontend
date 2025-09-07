import classes from './LoginPage.module.css';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from '@mantine/form';

import { login } from '../../services/adminService.ts';

import { Button, Container, Paper, PasswordInput, TextInput, Title, } from '@mantine/core';

export function LoginPage() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [params] = useSearchParams();
    const redirectTo = params.get('redirectTo') || '/dashboard';

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: (value) => (value.length > 0 ? null : 'Ingrese su usuario'),
            password: (value) => (value.length > 0 ? null : 'Ingrese su contraseña'),
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        setError(null);

        const res = await login(values.username, values.password);

        if (!res) {
            setError('Usuario o contraseña incorrectos');
        } else {
            navigate(redirectTo, { replace: true });
        }

        setLoading(false);
    }
    
    return (
        <Container size={420} my={200}>
            <Title ta="center" className={classes.title}> Login </Title>

            <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput label="Usuario" placeholder="Tu usuario" required radius="md" {...form.getInputProps('username')}/>
                    <PasswordInput label="Contraseña" placeholder="Tu contraseña" required mt="md" radius="md" {...form.getInputProps('password')} />
                    {error && (<div style={{ color: 'red', marginTop: 10 }}>{error}</div>)}
                    <Button type='submit' fullWidth mt="xl" radius="md" loading={loading}> Ingresar </Button>
                </form>
            </Paper>
        </Container>
    )
}