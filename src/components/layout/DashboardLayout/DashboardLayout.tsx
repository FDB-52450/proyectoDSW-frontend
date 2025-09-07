import { useEffect, useState } from "react"

import { fetchCurrentUser } from "../../../services/adminService.ts"

import { Outlet } from "react-router-dom"
import { NavigationSideBar } from "./NavigationSideBar/NavigationSideBar.tsx"
import { Flex } from "@mantine/core"
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
                <NavigationSideBar user={user}/>
                <Outlet/>
            </Flex>
        </>
    )
}