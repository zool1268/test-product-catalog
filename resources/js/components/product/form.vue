<script lang="ts" setup>
import useApiQuery from '@/composables/useApiQuery';
import type { AxiosError } from "axios"

import { type Product } from '@/types';
import api, { type ApiError } from '@/utils/api';
import { QForm, useQuasar } from 'quasar';
import { computed, ref } from 'vue';


const props = defineProps<{
    product?: Product
}>()
const emit = defineEmits<{
    saved: [Product | null]
    cancel: []
}>()

const $q = useQuasar()
const formRef = ref<QForm>()
const errors = ref({
    name: "",
    category_id: "",
    description: "",
    price: ""
})
const isNew = !props.product
const productProperties = ref({
    name: props.product?.name || '',
    description: props.product?.description || '',
    categoryId: props.product?.category_id || null,
    price: props.product?.price || 0.0,
})

const { data: categoriesData } = useApiQuery("categories")
const categories = computed(() => categoriesData.value?.data.map((c: {id: number, name: string}) => ({label: c.name, value: c.id})) || [])

async function onSubmit() {
    try {
        const resp = await (isNew ? api.post('products', productProperties.value) : api.put(`products/${props.product.id}`, productProperties.value))
        emit('saved', resp.data)
    } catch (e: unknown) {
        const axiosError = e as AxiosError<ApiError>
        if (axiosError.response?.status === 422 && axiosError.response.data.errors) {
            errors.value = Object.fromEntries(
                Object.entries(axiosError.response.data.errors).map(([k, v]: any) => [k, v.join(', ')])
            )
        } else {
            $q.notify({
                type: 'negative',
                message: axiosError.response?.data.message || 'Неозвестная ошибка',
                position: 'bottom'
            })
        }
    }
}
</script>

<template lang="pug">
    q-form(@submit="onSubmit")
        q-card
            q-card-section.q-gutter-md
                q-input(
                    name="name"
                    v-model="productProperties.name"
                    label="Название *"
                    :error="!!errors.name"
                    :error-message="errors.name"
                )
                q-select(
                    v-model="productProperties.categoryId"
                    :options="categories"
                    style="width: 300px;"
                    label="Категория *"
                    emit-value
                    map-options
                    required
                    :error="!!errors.category_id"
                    :error-message="errors.category_id"
                )
                q-editor(
                    v-model="productProperties.description"
                    @keyup.enter.stop
                    :error="!!errors.description"
                    :error-message="errors.description"
                )
                q-input(
                    v-model="productProperties.price"
                    type="number"
                    :error="!!errors.price"
                    :error-message="errors.price"
                )
            q-card-actions
                q-btn(
                    color="primary"
                    type="submit"
                ) Сохранить
                q-btn(
                    @click="emit('cancel')"
                ) Отмена
</template>
