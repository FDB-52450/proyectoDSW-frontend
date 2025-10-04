import { useState } from "react";

import { Burger, Drawer } from "@mantine/core";

import { NavigationSideBar } from "../NavigationSideBar/NavigationSideBar.tsx";

import type { User } from "../../../../entities/user.ts";

export function MobileMenu({user}: {user: User}) {
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Burger opened={opened} onClick={() => setOpened((o) => !o)} hiddenFrom="lg" color="white"/>    
            <Drawer opened={opened} onClose={() => setOpened(false)}padding="md"size="sm">
                <NavigationSideBar user={user} close={() => setOpened(false)}></NavigationSideBar>
            </Drawer>
        </>
    )
}