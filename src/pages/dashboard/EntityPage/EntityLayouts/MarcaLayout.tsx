import { useMantineTheme } from '@mantine/core'

import { Grid, Flex, Text, TextInput } from "@mantine/core"

import { ImageDropzone } from "./ImageDropzone/ImageDropzone.tsx"

import type { UseFormReturnType } from "@mantine/form"
import type { MarcaFormValues } from '../formData/formTypes.ts'

interface MarcaLayoutProps {
    form: UseFormReturnType<MarcaFormValues>,
    isEditable: boolean,
}

export function MarcaLayout({form, isEditable}: MarcaLayoutProps) {
    const theme = useMantineTheme()

    return (
        <>
            <form>
                <Grid w='100%' mt={30}>
                    <Grid.Col span={3} h={85}>
                        <Flex direction='column'>
                            <Text fw={650} mt={6}>NOMBRE</Text>
                            <TextInput radius="md" readOnly={!isEditable} withAsterisk {...form.getInputProps('nombre')}
                            styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={9}/>

                    <Grid.Col span={3}>
                        <Flex direction='column' align='flex-start'>
                            <Text fw={650} mt={6}>IMAGEN</Text>
                            <ImageDropzone form={form} isEditable={isEditable}></ImageDropzone>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </form>
        </>
    )
}