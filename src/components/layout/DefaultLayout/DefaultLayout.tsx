import { useEffect, useState } from "react"

import { fetchCurrentUser } from "../../../services/adminService.ts"

import { Outlet } from "react-router-dom"
import { NavigationBar } from "./NavigationBar/NavigationBar.tsx"
import { Footer } from "./Footer/Footer.tsx"
import { WhatsappButton } from "./WhatsappButton/WhatsappButton.tsx"

import type { User } from "../../../entities/user.ts"

export function DefaultLayout() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        fetchCurrentUser()
        .then((res) => {
            if (res.user) {
                setUser(res.user)
            }
        })
    }, [])

    return (
        <>
            <WhatsappButton></WhatsappButton>
            <NavigationBar user={user}/>
            <Outlet/>
            <Footer/>
        </>
    )
}