import { useNavigate } from "react-router-dom";

import { logout } from "../../../../../services/adminService.ts";

import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core"

import { IconChevronDown, IconLogout2 } from "@tabler/icons-react"

import type { User } from "../../../../../entities/user.ts"

export function UserSection({user}: {user: User}) {
    const navigate = useNavigate()

    return (
        <Menu width={200} position="bottom-end" withinPortal>
            <Menu.Target>
                <UnstyledButton>
                    <Group gap={7}>
                        <Text fw={500} size="sm" lh={1} mr={3} c='white'> {user.username}</Text>
                        <Avatar radius="xl" size={45} color='white' variant="transparent"/>
                        <IconChevronDown size={12} stroke={3} color='white'/>
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>{user.username} - {user.role}</Menu.Label>
                <Menu.Item color="red" leftSection={<IconLogout2 size={16} stroke={2} onClick={() => {logout(); navigate('/', {replace: true})}}/>}>
                    Cerrar sesion
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}