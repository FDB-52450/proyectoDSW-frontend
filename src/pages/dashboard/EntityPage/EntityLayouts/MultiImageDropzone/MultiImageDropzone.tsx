import classes from './MultiImageDropzone.module.css'

import { useState } from 'react';

import { ActionIcon, Button, Group, Image, Stack, Text, Tooltip } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';

import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';

import noImage from '../../../../../assets/noImage.png';

import type { UseFormReturnType } from '@mantine/form';
import type { Imagen } from '../../../../../entities/imagen.ts';
import type { ProductoFormValues } from '../../formData/formTypes.ts';

interface ImageDropzoneProps {
    form: UseFormReturnType<ProductoFormValues>,
    isEditable: boolean
}

export function MultiImageDropzone({form, isEditable}: ImageDropzoneProps) {
    const [activeImage, setActiveImage] = useState<number>(0)

    const formValues = form.getValues()

    function getImageLink(idx = activeImage) {
        if (formValues.imagenes[idx]) {
            const imagen = formValues.imagenes[idx]

            if (imagen.file) {
                return imagen.url
            } else {
                return `http://localhost:8080/images/${imagen.url}/large.webp`
            }
        }

        return noImage
    }

    return (
        <Stack gap={0} align='flex-end'>
            <Dropzone maxSize={5 * 1024 ** 2} accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.webp]} multiple={false}
            onReject={(files) => console.log('rejected files', files)} disabled={!isEditable} className={!isEditable ? classes.disabled : ''}
            onDrop={(files) => { 
                const file = files[0]
                const previewUrl = URL.createObjectURL(file)
                const imagen: Imagen = {id: -1, imagenPrimaria: true, url: previewUrl, file: file}
                form.setFieldValue('imagenes', [...formValues.imagenes, imagen])       
                }}>

                <Group justify="center" gap="xl" mih={300} miw={300}>
                    {formValues.imagenes[activeImage] ? 
                    <Image src={getImageLink()} alt="Vista previa" style={{maxHeight: 275, maxWidth: 275, objectFit: 'contain'}}/>
                    :
                    <>
                        <Dropzone.Accept>
                            <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <Stack align='center'>
                                <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
                                <Text size="xl" inline>
                                    {isEditable ? 'Agregar imagen' : 'Sin imagen'}
                                </Text>
                            </Stack>
                        </Dropzone.Idle>
                    </>
                    }
                </Group>
            </Dropzone>
            <Tooltip label='Borrar imagen' position='bottom'>
                <ActionIcon mr={-8} mt={-20} variant='default' style={{ visibility: isEditable && formValues.imagenes[activeImage] ? 'visible' : 'hidden' }}
                onClick={() => form.setFieldValue('imagenes', formValues.imagenes.filter((_, i) => i !== activeImage))}>
                    <IconX size={30}></IconX>
                </ActionIcon>
            </Tooltip> 
            <Group w='100%' justify='center' gap={15} mt={10}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Button onClick={() => setActiveImage(index)} variant='default' style={{height: 60, width: 60}} p={5}>
                        {formValues.imagenes[index] ? 
                        <Image src={getImageLink(index)} alt="Vista previa" style={{maxHeight: 50, maxWidth: 50, objectFit: 'contain'}}/>
                        : 
                        <IconPhoto size={35} color="var(--mantine-color-dimmed)" stroke={1}/>}
                    </Button>
                ))}
            </Group>
        </Stack>
    )
}