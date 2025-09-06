import { Outlet } from "react-router-dom"
import { NavigationSideBar } from "./NavigationSideBar/NavigationSideBar.tsx"
import { Flex } from "@mantine/core"
import { NavigationBar } from "./NavigationBar/NavigationBar.tsx"

export function DashboardLayout() {
    return (
        <>
            <NavigationBar/>
            <Flex>
                <NavigationSideBar />
                <Outlet/>
            </Flex>
        </>
    )
}