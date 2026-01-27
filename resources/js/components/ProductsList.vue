<script setup lang="ts">
import useApiQuery from '@/composables/useApiQuery';
import products from '@/routes/products';
import { computed, ref } from 'vue';

const category = ref()
const search = ref("")
const page = ref(1)
const { data: productsData, loading } = useApiQuery("products", {
    arguments: {
        page: computed(() => page.value),
        category_id: computed(() => category.value),
        search: computed(() => search.value)
    }
})
const { data: categoriesData } = useApiQuery("categories")
const categories = computed(() => categoriesData.value?.data.map((c: {id: number, name: string}) => ({label: c.name, value: c.id})) || [])
</script>

<template lang="pug">
    .row
        .col
            .flex.q-gutter-md
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
                q-input(
                    v-model="search"
                    label="Поиск"
                    clearable
                )
    .row.q-mt-sm
        .col
            .row
                q-list.full-width
                    template(v-for="product of productsData?.data")
                        slot(name="product-item" :product="product")
                            product-item(:key="`p-${product.id}`" :product="product")
            .row.flex.flex-center
                q-pagination(
                    v-model="page"
                    :max="productsData?.meta.last_page || 1"
                    input
                    v-if="productsData?.data && productsData.data.length > 0"
                )
        q-inner-loading(:showing="loading")
</template>
