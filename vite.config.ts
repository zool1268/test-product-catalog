import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.ts'],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        wayfinder({
            formVariants: true,
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia',
                '@vueuse/core',
            ],

            dirs: [
                './resources/js/composables/**',
                './resources/js/utils/**',
            ],

            dts: './resources/js/.auto-imports.d.ts',

            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json',
            },

            vueTemplate: true,
        }),

        Components({
            dirs: ['resources/js/components'],
            extensions: ['vue'],
            dts: './resources/js/.components.d.ts',
        }),
    ],

    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
