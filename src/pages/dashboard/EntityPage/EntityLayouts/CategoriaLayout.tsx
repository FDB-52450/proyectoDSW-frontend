import { Flex, Grid, NumberInput, Text, TextInput, Tooltip, useMantineTheme} from "@mantine/core"

import type { UseFormReturnType } from "@mantine/form"
import type { CategoriaFormValues } from "../formData/formTypes.ts"

export function CategoriaLayout({form, isEditable}: {form: UseFormReturnType<CategoriaFormValues>, isEditable: boolean}) {
    const theme = useMantineTheme()

    return (
        <>
            <form>
                <Grid w='100%' mt={30}>
                    <Grid.Col span={3} h={85}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>NOMBRE (*)</Text>
                            <TextInput radius="md" readOnly={!isEditable} {...form.getInputProps('nombre')} id='nombre'
                                styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1.5}/>

                    <Grid.Col span={3} h={85}>
                        <Flex direction='column'>
                            <Tooltip label='(en meses)'>
                                <Text fw={650} mt={6}>GARANTIA (*)</Text>
                            </Tooltip>
                            <NumberInput radius="md" readOnly={!isEditable} {...form.getInputProps('duracionGarantia')} id='garantia'
                                styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={1.5}/>

                    <Grid.Col span={3} h={85}>
                        <Flex direction='column'>
                            <Tooltip label='(en unidades)'>
                                <Text fw={650} mt={6}>LIMITE STOCK (*)</Text>
                            </Tooltip>
                            <NumberInput radius="md" readOnly={!isEditable} {...form.getInputProps('stockLimit')} id='stockLim'
                                styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </form>
        </>
    )
}