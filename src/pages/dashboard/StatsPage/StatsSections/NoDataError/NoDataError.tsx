import { Stack, Text } from "@mantine/core";
import { IconEyeOff } from "@tabler/icons-react";

export function NoDataError({type}: {type: 'small' | 'normal'}) {
    return (
        <Stack align='center' mt={type === 'normal' ? 100 : 30}>
            <IconEyeOff color='grey' size={type === 'normal' ? '50px' : '30px'}></IconEyeOff>
            <Text c='grey' size={type === 'normal' ? '20px' : '15px'} ta='center'>[No hay datos disponibles]</Text>
        </Stack>
    )
}