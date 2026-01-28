<script setup lang="ts">
import ProductsList from '@/components/ProductsList.vue';
import { type Product } from '@/types';
import api from '@/utils/api';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const editDialog = ref(false)
const selectedProduct = ref<Product | null>()
const productListRef = ref<InstanceType<typeof ProductsList> | null>()

const $q = useQuasar()
function refreshProducts() {
    if (productListRef.value) {
        productListRef.value.updateData()
    }
}
function onProductSaved() {
    refreshProducts()
    editDialog.value = false
}

function handleEditProduct(product: Product) {
    selectedProduct.value = product
    editDialog.value = true
}

function handleAddProduct() {
    selectedProduct.value = null
    editDialog.value = true
}

const handleProductDeleted = async () => {
  if (!selectedProduct.value) return

  try {
    await api.delete(`/products/${selectedProduct.value.id}`)

    $q.notify({
      type: 'positive',
      message: 'Товар успешно удален',
      position: 'top'
    })

    refreshProducts()
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Ошибка при удалении товара',
      position: 'top'
    })
  } finally {
    selectedProduct.value = null
  }
}

function handleDeleteProduct(product: Product) {
    selectedProduct.value = product
    $q.dialog({
        title: 'Подтверждение удаления',
        message: `Вы уверены, что хотите удалить товар "${selectedProduct.value?.name}"?`,
        cancel: "Отмена",
        persistent: true
    }).onOk(handleProductDeleted)
}
</script>

<template lang="pug">
    q-card
        q-card-section
            h5 Управление товарами
        q-card-section
            products-list(ref="productListRef")
                template(#product-item="{ product }")
                    q-item(clickable)
                        q-item-section
                            .row
                                .col {{ product.name }}
                            .row.full-width.q-mt-sm.text-center
                                .col(v-html="product.short_description")
                                .col {{ product.formatted_price }}
                                .col-1
                                    q-btn(color="primary" @click="handleEditProduct(product)") Редактировать
                                .col-1
                                    q-btn(color="primary" @click="handleDeleteProduct(product)") Удалить
                template(#before-filter)
                    q-btn(color="primary" @click="handleAddProduct()") Создать
    q-dialog(v-model="editDialog" persistent)
        q-card
            q-card-section.flex.items-center.justify-between
                h6 Редактирование товара
                q-btn(v-close-popup flat round dense icon="close")
            q-card-section.q-pa-sm
                product-form(
                    :product="selectedProduct"
                    @saved="onProductSaved"
                    @cancel="editDialog = false"
                )
</template>
