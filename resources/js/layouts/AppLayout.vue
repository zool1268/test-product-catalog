<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from '@inertiajs/vue3'
import { computed, ref } from 'vue'

import { useAuthStore } from '@/stores/useAuthStore'


const auth = useAuthStore()

const isAuthenticated = computed(() => auth.isAuthenticated)
const showLoginForm = ref(false)
const handleLogout = async () => {
    await auth.logout()
    showLoginForm.value = false
}
</script>

<template lang="pug">
    q-layout(class="hHh lpR fFf")
        q-header.bg-primary.text-white(elevated)
            q-toolbar-title.row.items-center.no-wrap.q-px-md
                Link.q-ml-md(href="/") Тестовый каталог товаров
                q-space
                q-btn(v-if="isAuthenticated" flat @click="handleLogout") Выйти
                q-btn(v-else flat @click.prevent="showLoginForm = true") Вход
                    q-dialog(v-model="showLoginForm")
                        q-card.two-col-modal
                            q-card-section.flex.items-center.justify-between
                                h6 Вход
                                q-btn(v-close-popup flat round dense icon="close")
                            q-card-section.q-pa-sm
                                login-form(@loggedin="showLoginForm = false")
            q-toolbar.text-center(v-if="isAuthenticated")
                Link(href="/admin/products") Управление товарами
        q-page-container
            q-page.q-pa-md
                slot
</template>
