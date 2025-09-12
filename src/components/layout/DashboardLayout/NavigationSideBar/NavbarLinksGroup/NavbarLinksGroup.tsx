import classes from './NavbarLinksGroup.module.css'

import { useState } from 'react'

import { Link } from 'react-router-dom'
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core'

import { IconChevronRight } from '@tabler/icons-react'

interface LinksGroupProps {
    icon: React.ElementType
    label: string
    initiallyOpened?: boolean
    links?: { label: string; link: string }[]
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
    const hasLinks = Array.isArray(links)
    const [opened, setOpened] = useState(initiallyOpened || false)
    const items = (hasLinks ? links : []).map((link) => (
        <Text
            component={Link}
            className={classes.link}
            to={`/dashboard${link.link}`}
            key={link.label}
            fw={550}
        >
        {link.label}
        </Text>
    ))

    return (
        <>
        <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
            <Group justify="space-between" gap={0}>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeIcon variant="light" size={30}>
                        <Icon size={18} />
                    </ThemeIcon>
                    <Box ml="md"><Text size='sm' fw={600}>{label}</Text></Box>
                </Box>
                {hasLinks && (
                    <IconChevronRight
                    className={classes.chevron}
                    stroke={1.5}
                    size={16}
                    style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
                    />
                )}
            </Group>
        </UnstyledButton>
        {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    )
}