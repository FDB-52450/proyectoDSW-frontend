import '@mantine/core/styles.css'

import '@mantine/notifications/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/dates/styles.css'

import 'dayjs/locale/es'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider>
            <DatesProvider settings={{ locale: 'es' }}>
                <App/>
            </DatesProvider>
        </MantineProvider>
    </StrictMode>,
)
