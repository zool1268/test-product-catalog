<script lang="ts" setup>
import type { Product } from '@/types';
import { router } from '@inertiajs/vue3'
import { show } from '@/routes/product'

const props = defineProps<{
    product: Product
}>()
function goToProduct() {
    router.visit(show.url(props.product.id))
}
</script>

<template lang="pug">
    q-item(clickable @click="goToProduct")
        q-item-section
            .row.border-bottom категория: {{ product.category.name }}
            .row
                .col {{ product.name }}
                .col(v-html="product.short_description")
                .col.text-center {{ product.formatted_price }}
    <q-separator spaced />
</template>
