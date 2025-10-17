import { useEffect, useState } from "react"

import { Autocomplete, Grid, Flex, Text, TextInput, Tooltip, Checkbox, Group} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"

import { useMantineTheme } from '@mantine/core'

import type { UseFormReturnType } from "@mantine/form"
import type { ClienteFormValues } from "../formData/formTypes.ts"
import { IconInfoCircle } from "@tabler/icons-react"

export function ClienteLayout({form, isEditable}: {form: UseFormReturnType<ClienteFormValues>, isEditable: boolean}) {
    const provincias = ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa",
        "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
        "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán", "Ciudad Autonoma de Buenos Aires"
    ]

    const [ban, setBan] = useState<boolean>(form.values.banStart ? true : false)

    const theme = useMantineTheme()

    function clearFields(value: string) {
        form.setFieldValue('provincia', value)
        form.setFieldValue('ciudad', '')
        form.setFieldValue('direccion', '')
        form.setFieldValue('codigoPostal', '')
    }

    useEffect(() => {
        setBan(!!form.values.banStart);
    }, [form.values.banStart]);

    function setBanned(check: boolean) {
        if (form.values.banStart) {
            form.setFieldValue('banStart', null)
            form.setFieldValue('banEnd', null)
            form.setFieldValue('banRazon', '')
        }

        setBan(check)
    }

    return (
        <>
            <form>
                <Grid w='100%' mt={30}>
                    <Grid.Col span={3} h={85}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>DNI (*)</Text>
                            <TextInput radius="md" readOnly={!isEditable} {...form.getInputProps('dni')}
                                styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>EMAIL (*)</Text>
                            <TextInput radius="md" readOnly={!isEditable} {...form.getInputProps('email')}
                            styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>CIUDAD (*)</Text>
                            <TextInput radius="md" readOnly={!isEditable} {...form.getInputProps('ciudad')}
                            styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3} h={85}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>NOMBRE (*)</Text>
                            <TextInput radius="md" readOnly={!isEditable} withAsterisk {...form.getInputProps('nombre')}
                            styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>TELEFONO (*)</Text>
                            <Tooltip label='Formato: +54 9 [codigo de area] [numero de abonado]' events={{hover: isEditable, focus: false, touch: false}}>
                                <TextInput radius="md" readOnly={!isEditable} {...form.getInputProps('telefono')}
                                styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                            </Tooltip>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>DIRECCION (*)</Text>
                            <TextInput radius="md" readOnly={!isEditable} {...form.getInputProps('direccion')}
                            styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3} h={85}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>APELLIDO (*)</Text>
                            <TextInput radius="md" readOnly={!isEditable} {...form.getInputProps('apellido')}
                            styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>PROVINCIA (*)</Text>
                            <Autocomplete radius="md" readOnly={!isEditable} data={provincias} {...form.getInputProps('provincia')}
                            onChange={(value) => clearFields(value)} styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>
            
                    <Grid.Col span={3}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>COD. POSTAL (*)</Text>
                            <TextInput radius="md" readOnly={!isEditable} {...form.getInputProps('codigoPostal')}
                            styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={2}>
                        <Flex direction='column'>
                            <Group gap={5}>
                                <Text fw={650} mt={6}>BLOQUEADO?</Text>
                                <Tooltip label='Para suspender o reactivar un cliente, utilize las opciones en el listado de clientes.' position="right">
                                    <IconInfoCircle size={16} style={{marginTop: 3}}/>
                                </Tooltip>
                            </Group>
                            <Checkbox radius="md" color='green' size='md' disabled={true}
                            checked={ban} onChange={(e) => setBanned(e.currentTarget.checked)}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={9}/>

                    {ban ? 
                    <Grid.Col span={3}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>FECHA DE INICIO</Text>
                            <DatePickerInput radius="md" readOnly={true} {...form.getInputProps('banStart')}
                            styles={{ input: {backgroundColor: theme.colors.gray[1]}}} valueFormat="DD/MM/YYYY"/>
                        </Flex>
                    </Grid.Col>
                    : null}

                    {form.values.banStart ? 
                    <>
                    <Grid.Col span={1}/>

                    <Grid.Col span={3}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>FECHA DE FIN</Text>
                            <DatePickerInput radius="md" readOnly={true} {...form.getInputProps('banEnd')}
                            styles={{ input: {backgroundColor: theme.colors.gray[1]}}} valueFormat="DD/MM/YYYY"/>
                        </Flex>
                    </Grid.Col>
                    </>
                    : null}

                    {ban ? 
                    <>
                    <Grid.Col span={1}/>

                    <Grid.Col span={3}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>RAZON DE BLOQUEO</Text>
                            <TextInput radius="md" readOnly={true} {...form.getInputProps('banRazon')}
                            styles={{ input: {backgroundColor: theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>
                    </>
                    : null}
                </Grid>
            </form>
        </>
    )
}