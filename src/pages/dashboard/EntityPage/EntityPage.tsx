import styles from './EntityPage.module.css'

import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, type UseFormReturnType } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import { createProduct, fetchProduct, updateProduct } from '../../../services/productService.ts';
import { createMarca, fetchMarca, updateMarca } from '../../../services/marcaService.ts';
import { createCategoria, fetchCategoria, updateCategoria } from '../../../services/categoriaService.ts';
import { createPedido, fetchPedido, updatePedido } from '../../../services/pedidoService.ts';
import { createCliente, fetchCliente, updateCliente } from '../../../services/clienteService.ts';
import { createAdmin, fetchAdmin, updateAdmin } from '../../../services/adminService.ts';

import { formConfigMap } from './formData/formData.ts';

import { ActionIcon, Box, Button, Container, Divider, Flex, Group, LoadingOverlay, Text, Title, Tooltip} from '@mantine/core'

import { CategoriaLayout } from './EntityLayouts/CategoriaLayout.tsx';
import { ClienteLayout } from './EntityLayouts/ClienteLayout.tsx';
import { PedidoLayout } from './EntityLayouts/PedidoLayout.tsx';
import { MarcaLayout } from './EntityLayouts/MarcaLayout.tsx';
import { ProductoLayout } from './EntityLayouts/ProductoLayout.tsx';
import { AdminLayout } from './EntityLayouts/AdminLayout.tsx';

import { DeleteModal } from '../../../components/confirmationModals/DeleteModal.tsx';

import { IconCategory, IconDeviceFloppy, IconPlus, IconTool, IconTrash, IconX } from '@tabler/icons-react';

import type { ProductoFormValues, CategoriaFormValues, MarcaFormValues, PedidoFormValues, ClienteFormValues, AdminFormValues } from "./formData/formTypes.ts";
import type { Producto } from '../../../entities/producto.ts';
import type { Marca } from '../../../entities/marca.ts';
import type { Categoria } from '../../../entities/categoria.ts';
import type { Pedido } from '../../../entities/pedido.ts';
import type { Cliente } from '../../../entities/cliente.ts';
import type { Administrador } from '../../../entities/administrador.ts';
import type { Imagen } from '../../../entities/imagen.ts';

type Entity = Producto | Marca | Categoria | Pedido | Cliente | Administrador
type EntityTipo = 'productos' | 'marcas' | 'categorias' | 'pedidos' | 'clientes' | 'administradores'

function getChangedFieldsWithId<T extends Entity>(original: T, updated: T): Partial<T> {
    const diff: Partial<T> = {};

    for (const key in updated) {
        if (!Object.prototype.hasOwnProperty.call(updated, key)) continue;

        const originalValue = original[key]
        const updatedValue = updated[key]

        // Case 1: Both are non-null objects with an 'id' field
        const bothAreObjectsWithId =
            originalValue &&
            updatedValue &&
            typeof originalValue === 'object' &&
            typeof updatedValue === 'object' &&
            'id' in originalValue &&
            'id' in updatedValue

        const bothAreArraysOfImages =
            originalValue &&
            updatedValue &&
            Array.isArray(updatedValue) &&
            key === 'imagenes'

        if (bothAreObjectsWithId) {
            if (originalValue.id !== updatedValue.id) {
                diff[key] = updatedValue
            }
        }
        else if (bothAreArraysOfImages) {
            const changedImages = (updatedValue as Imagen[]).filter(img => img.file)

            if (changedImages.length > 0) {
                diff[key] = changedImages as T[typeof key]
            }

            /*updatedValue.forEach((img: any) => {
                if (img.file) diff[key] = diff[key] ? [...diff[key], img] : [img]
            })*/
        }
        // Case 2: Primitive values or other objects
        else if (updatedValue !== undefined && originalValue !== updatedValue) {
            if (key != 'detalle' && key != 'pedidos')
                diff[key] = updatedValue;
        }

    }

    return diff;
}

export function EntityPage() {
    const [data, setData] = useState<Producto | Marca | Categoria | Pedido | Cliente | Administrador | null>(null) 
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [opened, { open, close }] = useDisclosure(false);
    const [initialData, setInitialData] = useState<Producto | Marca | Categoria | Pedido | Cliente | Administrador | null>(null)

    const navigate = useNavigate()
  
    let { tipo, id } = useParams()

    if (id === undefined) id = "1"
    if (tipo === undefined) tipo = "productos"

    const createMode = id === 'new'
    const config = formConfigMap[tipo as EntityTipo]

    const [isEditable, setIsEditable] = useState<boolean>(createMode) 

    const form = useForm({
        initialValues: data ? data : config.initialValues,
        validate: config.validate,
        validateInputOnChange: true
    })

    /*const layoutMap: Record<string, React.ReactElement> = {
        productos: <ProductoLayout form={form as UseFormReturnType<Producto>} isEditable={isEditable}/>,
        marcas: <MarcaLayout form={form as UseFormReturnType<Marca>} isEditable={isEditable}/>,
        categorias: <CategoriaLayout form={form as UseFormReturnType<Categoria>} isEditable={isEditable}/>,
        pedidos: <PedidoLayout form={form as UseFormReturnType<Pedido>} isEditable={isEditable}/>,
        clientes: <ClienteLayout form={form as UseFormReturnType<Cliente>} isEditable={isEditable}/>,
    }*/

    const layoutMap: Record<string, React.ReactElement> = {
        productos: <ProductoLayout form={form as UseFormReturnType<ProductoFormValues>} isEditable={isEditable}/>,
        marcas: <MarcaLayout form={form as UseFormReturnType<MarcaFormValues>} isEditable={isEditable}/>,
        categorias: <CategoriaLayout form={form as UseFormReturnType<CategoriaFormValues>} isEditable={isEditable}/>,
        pedidos: <PedidoLayout form={form as UseFormReturnType<PedidoFormValues>} isEditable={isEditable}/>,
        clientes: <ClienteLayout form={form as UseFormReturnType<ClienteFormValues>} isEditable={isEditable}/>,
        administradores: <AdminLayout form={form as UseFormReturnType<AdminFormValues>} isEditable={isEditable}/>
    }

    useEffect(() => {
        if (createMode) {
            setLoading(false)
            setError(null)
            return
        }

        const fetchMap: Record<string, () => Promise<Producto | Marca | Categoria | Pedido | Cliente | Administrador | null>> = {
            productos: () => fetchProduct(id, true),
            marcas: () => fetchMarca(id),
            categorias: () => fetchCategoria(id),
            pedidos: () => fetchPedido(id),
            clientes: () => fetchCliente(id),
            administradores: () => fetchAdmin(id)
        }

        const fetchData = async () => {
            setLoading(true)
            setError(null)

            const fetchFn = fetchMap[tipo];

            if (!fetchFn) {
                setError("Tipo de dato no soportado.");
                setLoading(false);
                return;
            }

            try {
                const res = await fetchFn()
                setData(res)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('Unknown error occurred while fetching products')
                }
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [id, tipo, createMode]);

    // FIX: Patchy patch.

    useEffect(() => {
        if (data) {
            // PATCH
            form.setValues(data)
            setInitialData(data)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    
    const handleSubmit = async () => {  
        if (!form.validate().hasErrors) {
            const formData = form.getValues()

            if (createMode) {
                const createMap: Record<string, () => Promise<Producto | Marca | Categoria | Pedido | Cliente | Administrador>> = {
                    productos: () => createProduct(formData as Producto),
                    marcas: () => createMarca(formData as Marca),
                    categorias: async () => createCategoria(formData as Categoria),
                    pedidos: () => createPedido(formData as Pedido),
                    clientes: () => createCliente(formData as Cliente),
                    administradores: () => createAdmin(formData as Administrador)
                }

                const createFn = createMap[tipo]

                const response = await createFn()

                navigate(`/dashboard/${tipo}/${response.id}`, {replace: true})
            } else {
                if (!data) return null

                /*const cleanData: Partial<typeof formData> = {}

                for (const key in config.initialValues) {
                    const typedKey = key as keyof typeof formData

                    if (data != null && formData[typedKey] != data[typedKey] && key != 'id') {
                        if (typeof formData[typedKey] === 'object' && typeof data[typedKey] === 'object') {
                            console.log(data[typedKey], formData[typedKey])

                            cleanData[typedKey] = formData[typedKey]
                        } else {
                            cleanData[typedKey] = formData[typedKey]
                        }
                    }
                }
                */
               
                if (tipo === 'marcas') {
                    const marcaForm = formData as Marca

                    console.log(marcaForm.imagen)

                    if (marcaForm.imagen && !marcaForm.imagen.file) {
                        marcaForm.keepImage = true
                    }
                } else if (tipo === 'productos') {
                    const prodForm = formData as Producto
                    const prodData = data as Producto

                    const imagesToRemove = prodData.imagenes.filter(ogImg => !prodForm.imagenes.some(newImg => newImg.id === ogImg.id)).map(img => img.url)

                    if (imagesToRemove.length > 0) prodForm.imagesToRemove = imagesToRemove
                }

                console.log(data, formData)

                const diffData = getChangedFieldsWithId(data, formData as Entity) // Hacky hack.

                console.log(diffData)

                const updateMap: Record<string, () => Promise<Producto | Marca | Categoria | Pedido | Cliente | null>> = {
                    productos: () => updateProduct(id, diffData as Producto),
                    marcas: () => updateMarca(id, diffData as Marca),
                    categorias: async () => updateCategoria(id, diffData as Categoria),
                    pedidos: () => updatePedido(id, diffData as Pedido),
                    clientes: () => updateCliente(id, diffData as Cliente),
                    administradores: () => updateAdmin(id, diffData as Administrador)
                }

                const updateFn = updateMap[tipo]

                await updateFn()
            }

            setIsEditable(false)
        }
    };

    const isDirty = useMemo(() => { 
        const formData = form.getValues()
        let noChangesCheck = true

        for (const key in formData) {
            const typedKey = key as keyof typeof formData;

            if (typedKey != 'id' && typedKey != 'keepImage') {
                if (initialData != null && formData[typedKey] != initialData[typedKey]) {
                    noChangesCheck = false
                }
            }
        }

        return noChangesCheck
    }, [form, initialData])

    if (error) return <div>{error}</div> 

    const nombreTipo = tipo != 'administradores' ? tipo.slice(0, -1).toUpperCase() : tipo.slice(0, -2).toUpperCase()

    return (
        <Box w='100%' pos='relative'>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} loaderProps={{size: 75}}/> 
            <Container className={styles.entityContainer} fluid m={50} p={30}>
                <Group justify='space-between'>
                    <Flex align="flex-end" gap={10}>
                        <Group gap={5}>
                            <IconCategory size={35}/>
                            <Title fw={650}>{data != null ? (isEditable ? `EDITAR ${nombreTipo}` : `VER ${nombreTipo}`) : `CREAR ${nombreTipo}`}</Title>
                        </Group>
                        {data ? <Text size='lg' fw={500}>[ID: {data.id}]</Text> : ''} 
                    </Flex>
                    {(createMode || isEditable) || tipo === 'pedidos' ? '' :
                    <Tooltip label={'Crear ' + tipo.slice(0, -1)} position='left'>
                        <ActionIcon color='blue' ml={-5} size='lg' component='a' href={`/dashboard/${tipo}/new`}>
                            <IconPlus size={25}></IconPlus>
                        </ActionIcon>
                    </Tooltip>
                    }
                </Group>

                <Divider mt={20}></Divider>

                {layoutMap[tipo] ?? <Text>Tipo no soportado: {tipo}</Text>}

                <Group justify='flex-end' mt={30}>
                    {createMode ? 
                    <Button leftSection={<IconPlus/>} color='blue' onClick={handleSubmit} id='crearButton'> 
                        Crear {tipo.slice(0, -1)}
                    </Button>
                    :
                    <>
                        {isEditable ?
                        <>
                            <Tooltip label='No se han detectado cambios.' disabled={!isDirty}>
                                <Button leftSection={<IconDeviceFloppy/>} color='green' disabled={isDirty} onClick={handleSubmit}> 
                                    Guardar cambios
                                </Button>
                            </Tooltip>
                            <Button leftSection={<IconX/>} color='red' onClick={() => {form.setValues(data!); setIsEditable(false)}}> 
                                Cancelar cambios
                            </Button>
                        </>
                        :
                        <>
                            <Button leftSection={<IconTool/>} color='green' onClick={() => setIsEditable(true)}> 
                                Realizar cambios
                            </Button>
                            {tipo === 'pedidos' || tipo === 'clientes' ?
                            null :
                            <Button leftSection={<IconTrash/>} color='red' onClick={open}> 
                                Borrar {nombreTipo.toLowerCase()}
                            </Button>
                            }
                        </>
                        }
                    </>
                    }
                </Group>
            </Container>
            <DeleteModal tipo={tipo} id={String(data ? data.id : 0)} isOpen={opened} setClose={close}></DeleteModal>
        </Box>
    )
}