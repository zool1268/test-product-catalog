<script lang="ts" setup>
import type { Product } from '@/types';

const props = defineProps<{
    product: Product
}>()

</script>

<template lang="pug">
    q-item(clickable)
        q-item-section
            .row.border-bottom категория: {{ product.category.name }}
            .row
                .col {{ product.name }}
                .col {{ product.short_description }}
                .col.text-center {{ product.formatted_price }}
    <q-separator spaced />
</template>
