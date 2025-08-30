import { Outlet } from "react-router-dom"
import { NavigationBar } from "../NavigationBar/NavigationBar.tsx"
import { Footer } from "../Footer/Footer.tsx"

export function DefaultLayout() {
    return (
        <>
            <NavigationBar/>
            <Outlet/>
            <Footer/>
        </>
    )
}