<script lang="ts" setup>
import useApiQuery from '@/composables/useApiQuery';
import type { Product } from '@/types';
import { router } from '@inertiajs/vue3'
import { computed } from 'vue';

const props = defineProps<{
    id: string
}>()

const { data, loading } = useApiQuery<{ id: string }, { data: Product }>(`products/${props.id}`)
const product = computed(() => data.value?.data)
</script>

<template lang="pug">
    q-card
        q-card-section Категория: {{ product?.category.name }}
        q-card-section
            h3 {{ product?.name }}
        q-card-section(v-html="product?.description")
        q-card-section Цена: {{ product?.formatted_price }}
        q-card-actions
            q-btn(color="primary" @click.prevent="router.visit('/')") << к списку товаров
        q-inner-loading(:showing="loading")
</template>
