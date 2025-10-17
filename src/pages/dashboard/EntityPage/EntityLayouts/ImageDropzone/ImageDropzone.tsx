import classes from './ImageDropzone.module.css'

import { ActionIcon, Group, Image, Stack, Text, Tooltip } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';

import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';

import noImage from '../../../../../assets/noImage.png';

import type { UseFormReturnType } from '@mantine/form';
import type { MarcaFormValues } from '../../formData/formTypes.ts';

interface ImageDropzoneProps {
    form: UseFormReturnType<MarcaFormValues>,
    isEditable: boolean
}

export function ImageDropzone({form, isEditable}: ImageDropzoneProps) {
    const formValues = form.getValues()

    function getImageLink() {
        if (formValues.imagen) {
            if (formValues.imagen.file) {
                return formValues.imagen.url
            } else {
                return `http://localhost:8080/images/${formValues.imagen.url}/large.webp`
            }
        }

        return noImage
    }

    return (
        <Stack gap={0} align='flex-end'>
            <Dropzone maxSize={5 * 1024 ** 2} accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.webp]} multiple={false}
            onReject={(files) => console.log('rejected files', files)} disabled={!isEditable} className={!isEditable ? classes.disabled : ''}
            onDrop={(files) => { 
                const file = files[0]; 
                const previewUrl = URL.createObjectURL(file);
                const imagen = {id: -1, imagenPrimaria: true, url: previewUrl, file: file}
                form.setFieldValue('imagen', imagen)}}>
                <Group justify="center" gap="xl" mih={200} miw={200}>
                    {formValues.imagen ? 
                    <Image src={getImageLink()} alt="Vista previa" radius="md" mt="md"
                    style={{maxHeight: 200, maxWidth: 200, objectFit: 'contain'}}/>
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
            {isEditable && formValues.imagen != null ?
            <Tooltip label='Borrar imagen' position='bottom'>
                <ActionIcon mr={-8} mt={-20} variant='default' onClick={() => {form.setFieldValue('imagen', null)}}>
                    <IconX size={30}></IconX>
                </ActionIcon>
            </Tooltip> 
            : null
            }
        </Stack>
    )
}