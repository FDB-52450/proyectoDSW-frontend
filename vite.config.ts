import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom', // ← required to simulate the browser
        setupFiles: './tests/unitTests/setup.ts', // optional setup file
        exclude: [...configDefaults.exclude, 'tests/e2eTests/**']
    },
})
