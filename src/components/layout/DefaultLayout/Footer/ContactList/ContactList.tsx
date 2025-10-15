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
    { title: 'Email', description: 'soporte@technexus.com', icon: IconAt },
    { title: 'Telefono', description: '+54 9 432 4631-6492', icon: IconPhone },
    { title: 'Ubicacion', description: 'Rosario, Zeballos 1341', icon: IconMapPin },
    { title: 'Horarios', description: '9 a.m. - 17 p.m.', icon: IconSun },
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