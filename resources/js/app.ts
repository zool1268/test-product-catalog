import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Quasar } from 'quasar';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

import AppLayout from './layouts/AppLayout.vue';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const page = await resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue'))

        page.default.layout = page.default.layout || AppLayout
        return page
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(Quasar)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
