import { useEffect, useState } from "react"

import { fetchCurrentUser } from "../../../services/adminService.ts"

import { Flex } from "@mantine/core"

import { Outlet } from "react-router-dom"
import { NavigationSideBar } from "./NavigationSideBar/NavigationSideBar.tsx"
import { NavigationBar } from "./NavigationBar/NavigationBar.tsx"

import type { User } from "../../../entities/user.ts"

export function DashboardLayout() {
    const [user, setUser] = useState<User>({id: -1, username: '-', role: '-'})

    useEffect(() => {
        fetchCurrentUser()
        .then((res) => {
            setUser(res.user)
        })
    }, [])

    return (
        <>
            <NavigationBar user={user}/>
            <Flex>
                <Flex visibleFrom="lg">
                    <NavigationSideBar user={user} type="normal"/>
                </Flex>
                <Outlet/>
            </Flex>
        </>
    )
}