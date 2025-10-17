import { useParams } from "react-router-dom"

import { Flex, Grid, PasswordInput, Select, Text, TextInput, Tooltip, useMantineTheme } from "@mantine/core"

import type { UseFormReturnType } from "@mantine/form"
import type { AdminFormValues } from "../formData/formTypes.ts"

export function AdminLayout({form, isEditable}: {form: UseFormReturnType<AdminFormValues>, isEditable: boolean}) {
    const theme = useMantineTheme()

    const { id } = useParams()

    const createMode = id === 'new'

    return (
        <>
            <form>
                <Grid w='100%' mt={30}>
                    <Grid.Col span={3} h={75}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>NOMBRE (*)</Text>
                            <TextInput radius="md" readOnly={!isEditable} {...form.getInputProps('nombre')}
                                styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1.5}/>

                    <Grid.Col span={3} h={75}>
                        <Flex direction='column'>
                            <Tooltip label='Para cambiar la contraseña, utilize la opcion de "cambiar contraseña" en el listado de administradores.'>
                                <Text fw={650} mt={6}>CONTRASEÑA (*)</Text>
                            </Tooltip>
                            <PasswordInput radius="md" readOnly={!createMode} {...form.getInputProps('password')} 
                            styles={{ input: {backgroundColor: createMode ? 'white' : theme.colors.gray[1]}, 
                            visibilityToggle: {display: createMode ? 'block' : 'none'}}}/>
                        </Flex>
                    </Grid.Col>

                    {/*<Grid.Col span={3} h={75}>
                        <Flex direction='column'>
                            <Tooltip label='La contraseña no puede modificarse, solo puede asignarse una nueva.'>
                                <Text fw={650} mt={6}>{isEditable && !createMode ? 'NUEVA CONTRASEÑA' : 'CONTRASEÑA (*)'}</Text>
                            </Tooltip>
                            <PasswordInput radius="md" readOnly={!isEditable} {...form.getInputProps('password')} 
                            value={isEditable ? form.values.password : '*********'} required={createMode}
                            styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}, 
                            visibilityToggle: {display: isEditable ? 'block' : 'none'}}}/>
                        </Flex>
                    </Grid.Col>*/}

                    <Grid.Col span={1.5}/>

                    <Grid.Col span={3} h={75}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>ROL (*)</Text>
                            <Select radius="md" readOnly={true} data={[{ value: 'admin', label: 'Admin' }, { value: 'superadmin', label: 'Super-Admin' }]} 
                            {...form.getInputProps('role')}styles={{input: {backgroundColor: theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </form>
        </>
    )
}