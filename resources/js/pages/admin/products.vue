<script setup lang="ts">

</script>

<template lang="pug">
    q-card
        q-card-section
            h5 Управление товарами
        q-card-section
            products-list
                template(#product-item="{ product }")
                    q-item(clickable)
                        q-item-section
                            .row
                                .col {{ product.name }}
                            .row.full-width.q-mt-sm.text-center
                                .col {{ product.short_description }}
                                .col {{ product.formatted_price }}
                                .col-1
                                    q-btn(color="primary") редактировать
                                .col-1
                                    q-btn(color="primary") удалить
</template>
