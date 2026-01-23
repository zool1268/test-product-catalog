<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from '@inertiajs/vue3';

</script>

<template lang="pug">
    q-layout(class="hHh lpR fFf")
        q-header.bg-primary.text-white(elevated)
            q-toolbar-title.row.items-center.no-wrap
                Link(href="/") Тестовый каталог товаров
        q-page-container
            q-page.q-pa-md
                slot
</template>
