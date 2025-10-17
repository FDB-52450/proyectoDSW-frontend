import { useEffect, useState } from "react"

import { fetchMarcas } from "../../../../services/marcaService.ts"
import { fetchCategorias } from "../../../../services/categoriaService.ts"

import { Grid, Flex, Text, TextInput, NumberInput, Stack, Textarea, Checkbox, Select, Group, useMantineTheme } from "@mantine/core"

import { MultiImageDropzone } from "./MultiImageDropzone/MultiImageDropzone.tsx"

import type { UseFormReturnType } from "@mantine/form"
import type { ProductoFormValues } from "../formData/formTypes.ts"
import type { Marca } from "../../../../entities/marca.ts"
import type { Categoria } from "../../../../entities/categoria.ts"

export function ProductoLayout({form, isEditable}: {form: UseFormReturnType<ProductoFormValues>, isEditable: boolean}) {
    const [marcas, setMarcas] = useState<Marca[]>()
    const [categorias, setCategorias] = useState<Categoria[]>()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const theme = useMantineTheme()

    useEffect(() => {
        setLoading(true)

        fetchMarcas()
        .then((res) => {
            setMarcas(res.data)
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setLoading(false)
        })
        
        fetchCategorias()
        .then((res) => {
            setCategorias(res.data)
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    const transformDataToOptions = (data: Marca[] | Categoria[]) => {
        return data.map((m) => ({value: m.id.toString(), label: m.nombre}))
    }

    if (loading) return (<div>LOADING</div>)
    if (error) return (<div>{error}</div>)
    
    if (!marcas) return (<div></div>)
    if (!categorias) return (<div></div>)

    return (
        <>
            <form>
                <Grid w='100%' mt={30}>
                    <Grid.Col span={3}>
                        <Stack>
                            <Flex align='flex-start' justify="space-between" h={70} direction={'column'}>
                                <Text fw={650} mt={6}>NOMBRE (*)</Text>
                                <TextInput radius="md" readOnly={!isEditable} {...form.getInputProps('nombre')} w='100%'
                                    styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                            </Flex>
                            <Flex align='flex-start' justify="space-between" h={70} direction={'column'}>
                                <Text fw={650} mt={6}>PRECIO (*)</Text>
                                <NumberInput radius="md" readOnly={!isEditable} withAsterisk {...form.getInputProps('precio')} w='100%'
                                styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}} prefix='$'
                                decimalSeparator="," thousandSeparator="." allowNegative={false} allowDecimal={false}/>
                            </Flex>
                            <Flex align='flex-start' justify="space-between" h={70} direction={'column'}>
                                <Text fw={650} mt={6}>DESCUENTO</Text>
                                <NumberInput radius="md" readOnly={!isEditable} {...form.getInputProps('descuento')} w='100%'
                                styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}} suffix='%'
                                allowNegative={false} allowDecimal={false} max={100}/>
                            </Flex>
                            <Flex align='flex-start' justify="space-between" h={70} direction={'column'}>
                                <Text fw={650} mt={6}>STOCK (*)</Text>
                                <NumberInput radius="md" readOnly={!isEditable} {...form.getInputProps('stock')} w='100%' 
                                allowNegative={false} allowDecimal={false}
                                styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                            </Flex>
                            <Flex align='flex-start' justify="space-between" h={70} direction={'column'}>
                                <Text fw={650} mt={6}>STOCK RESERVADO</Text>
                                <NumberInput radius="md" readOnly={true} {...form.getInputProps('stockReservado')} w='100%' 
                                allowNegative={false} max={Number(form.values.stock) || undefined} allowDecimal={false}
                                styles={{ input: {backgroundColor: theme.colors.gray[1]}}}/>
                            </Flex>
                            <Flex align='flex-start' justify="space-between" h={70} direction={'column'}>
                                <Text fw={650} mt={6}>CATEGORIA (*)</Text>
                                <Select radius="md" disabled={!isEditable} data={transformDataToOptions(categorias)} 
                                {...form.getInputProps('categoria')} w='100%'
                                value={form.values.categoria.id.toString() || ''} onChange={(val) => {
                                    const selected = categorias.find((m) => m.id.toString() === val)

                                    form.setFieldValue('categoria', selected || form.values.categoria)
                                }}/>
                            </Flex>
                            <Flex align='flex-start' justify="space-between" h={70} direction={'column'}>
                                <Text fw={650} mt={6}>MARCA (*)</Text>
                                <Select radius="md" disabled={!isEditable} data={transformDataToOptions(marcas)} w='100%'
                                value={form.values.marca.id.toString() || ''} onChange={(val) => {
                                    const selected = marcas.find((m) => m.id.toString() === val)

                                    form.setFieldValue('marca', selected || form.values.marca)
                                }}/>
                            </Flex>
                            <Flex align='flex-start' justify="space-between" direction={'column'}>
                                <Text fw={650} mt={6}>DESTACADO</Text>
                                <Checkbox radius="md" color='green' size='md' disabled={!isEditable} 
                                {...form.getInputProps('destacado', { type: 'checkbox' })}/>
                            </Flex>
                            <Flex align='flex-start' justify="space-between" direction={'column'}>
                                <Text fw={650} mt={6}>OCULTADO</Text>
                                <Checkbox radius="md" color='green' size='md' disabled={!isEditable} 
                                {...form.getInputProps('ocultado', { type: 'checkbox' })}/>
                            </Flex>
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={7}>
                        <Stack align='flex-end'>
                            <Flex align='flex-end' justify="flex-end" h={210} direction={'column'} w='100%'>
                                <Group justify="flex-start" w='75%'>
                                    <Text fw={650} mt={6}>DESCRIPCION</Text>
                                </Group>
                                <Textarea radius="md" readOnly={!isEditable} {...form.getInputProps('desc')} minRows={8} maxRows={8} autosize w='75%'
                                styles={{ input: {backgroundColor: isEditable ? 'white' : theme.colors.gray[1]}}}/>
                            </Flex>
                            <Flex align='flex-start' justify="flex-end" direction={'column'}>
                                <Text fw={650} mt={6}>IMAGENES</Text>
                                <MultiImageDropzone form={form} isEditable={isEditable}></MultiImageDropzone>
                            </Flex>
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={3}>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3} h={75}>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3}>

                    </Grid.Col>

                    <Grid.Col span={1}/>
            
                    <Grid.Col span={3}>
                    </Grid.Col>

                    <Grid.Col span={1}/>

                    <Grid.Col span={3}>
                    </Grid.Col>
                </Grid>
            </form>
        </>
    )
}