import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import fonts from 'unplugin-fonts/vite'

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        fonts({
            google: {
                families: [
                    {
                        name: 'Inter',
                        styles: 'wght@100;200;300;400;500;600;700;800;900',
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
