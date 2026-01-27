<script setup lang="ts">
import useApiQuery from '@/composables/useApiQuery';
import { computed, ref } from 'vue';

const category = ref()
const page = ref(1)
const { data: productsData, loading } = useApiQuery("products", {
    arguments: {
        page: computed(() => page.value),
        category_id: computed(() => category.value)
    }
})
const { data: categoriesData } = useApiQuery("categories")
const categories = computed(() => categoriesData.value?.data.map((c: {id: number, name: string}) => ({label: c.name, value: c.id})) || [])
</script>

<template lang="pug">
    .row
        .col
            q-select(
                v-model="category"
                :options="categories"
                style="width: 300px;"
                label="Фильтр по категориям"
                emit-value
                map-options
            )
                template(v-slot:append)
                    q-icon(name="close" @click.stop.prevent="category = ''" class="cursor-pointer")
    .row.q-mt-sm
        .col
            .row
                q-list.full-width
                    product-item(v-for="product of productsData?.data" :key="`p-${product.id}`" :product="product")
            .row.flex.flex-center
                q-pagination(
                    v-model="page"
                    :max="productsData?.meta.last_page"
                    input
                )
        q-inner-loading(:showing="loading")
</template>
