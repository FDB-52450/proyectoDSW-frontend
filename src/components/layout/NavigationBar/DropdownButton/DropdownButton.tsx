import { IconChevronDown } from '@tabler/icons-react'
import { 
    Box, Center, Divider,
    Group, HoverCard, SimpleGrid,
    Text, ThemeIcon, UnstyledButton, useMantineTheme,
} from '@mantine/core'
import styles from './DropdownButton.module.css'

interface DataInterface {
    icon: string
    title: string
    filter: string
    subcategorias?: {title: string, filter: string}[]
}

export function DropdownButton({title, data}: {title: string, data: DataInterface[]}) {
  const theme = useMantineTheme()

  const links = data.map((item) => (
    <UnstyledButton className={styles.subLink} key={item.title}>
        <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={55} variant="default" radius="md">
                    <img className={styles.coloredIcon} src={item.icon} alt={item.title} style={{width: 35, height: 35}} />
                </ThemeIcon>
                <Box style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Text component="a" href={`/productos?categoria=${item.filter}`} rel="noopener noreferrer" size="sm" fw={500}>{item.title}</Text>
                    {item.subcategorias && item.subcategorias.map((sub) => (
                        <Text className={styles.hoverText} component="a" href={`/productos?categoria=${item.filter}&${sub.filter}`} rel="noopener noreferrer" 
                        size="xs" key={sub.title}>{sub.title}</Text>
                    ))}
                </Box>
        </Group>
    </UnstyledButton>
  ))

  return (
    <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
        <HoverCard.Target>
            <a href="#" className={styles.link}>
                <Center inline>
                    <Box component="span" mr={5}>
                        {title}
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                </Center>
            </a>
        </HoverCard.Target>

        <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
            <Group justify="space-between" px="md">
                <Text fw={500}>{title} de PC</Text>
            </Group>
            <Divider my="sm" />
            <SimpleGrid cols={2} spacing={0}>
                {links}
            </SimpleGrid>
        </HoverCard.Dropdown>
    </HoverCard>
  )
}