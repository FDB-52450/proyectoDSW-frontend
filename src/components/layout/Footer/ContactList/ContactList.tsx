import { IconAt, IconMapPin, IconPhone, IconSun } from '@tabler/icons-react'
import { Flex, Stack, Text, ThemeIcon } from '@mantine/core'
import classes from './ContactList.module.css'

import { useMediaQuery } from '@mantine/hooks';

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
    icon: typeof IconSun
    title: React.ReactNode
    description: React.ReactNode
}

function ContactIcon({ icon: Icon, title, description, ...others }: ContactIconProps) {
    return (
        <div className={classes.wrapper} {...others}>
            <ThemeIcon size={40} radius="md" className={classes.icon}>
                <Icon size={24} />
            </ThemeIcon>

            <div>
                <Text size="xs" className={classes.title}>
                {title}
                </Text>
                <Text className={classes.description}>{description}</Text>
            </div>
        </div>
    )
}

const MOCKDATA = [
    { title: 'Email', description: 'hello@mantine.dev', icon: IconAt },
    { title: 'Telefono', description: '+49 (800) 335 35 35', icon: IconPhone },
    { title: 'Ubicacion', description: '844 Morris Park avenue', icon: IconMapPin },
    { title: 'Horarios', description: '8 a.m. – 11 p.m.', icon: IconSun },
]

export function ContactList() {
    const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />)
    const isMobile = useMediaQuery('(max-width: 768px)')

    return (
        <Flex direction={isMobile ? 'column' : 'row'} gap="lg" mt={isMobile ? 'xl': 0}>
            <Stack w={isMobile ? '100%' : '50%'}>{items[0]} {items[1]}</Stack>
            <Stack w={isMobile ? '100%' : '50%'}>{items[2]} {items[3]}</Stack>
        </Flex>
    )
}