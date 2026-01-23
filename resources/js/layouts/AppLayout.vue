<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from '@inertiajs/vue3'
import { computed } from 'vue'

import { useAuthStore } from '@/stores/useAuthStore'


const auth = useAuthStore()

const isAuthenticated = computed(() => auth.isAuthenticated)
</script>

<template lang="pug">
    q-layout(class="hHh lpR fFf")
        q-header.bg-primary.text-white(elevated)
            q-toolbar-title.row.items-center.no-wrap.q-px-md
                Link(href="/") Тестовый каталог товаров
                q-space
                div -{{ isAuthenticated }}-
                q-space
                q-btn(v-if="isAuthenticated" @click="auth.logout()") logout
                q-btn(v-else @click="auth.login({email: 'user@tpc.ru', password: 'user'})") login
        q-page-container
            q-page.q-pa-md
                slot
</template>
