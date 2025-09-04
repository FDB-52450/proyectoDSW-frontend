import { useMediaQuery } from '@mantine/hooks'
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core'
import { IconLink, IconCheck } from '@tabler/icons-react'

export function CopyLinkButton() {
    const isSmall = useMediaQuery('(max-width: 400px)')

    return (
        <CopyButton value={window.location.href} timeout={2000}>
        {({ copied, copy }) => (
            <Tooltip label={copied ? 'Link copiado' : 'Copiar link de producto'} withArrow position="right">
            <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                {copied ? <IconCheck size={isSmall ? 20 : 30} /> : <IconLink size={isSmall ? 20 : 30} />}
            </ActionIcon>
            </Tooltip>
        )}
        </CopyButton>
    );
}