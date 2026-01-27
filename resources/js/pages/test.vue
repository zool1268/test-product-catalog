<script setup lang="ts">
import useApiQuery from '@/composables/useApiQuery';
import { computed, ref } from 'vue';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const props = defineProps<{
        var1?: string,
        var2?: string,
    }>()

    const page = ref(1)
    const { data } = useApiQuery("products", {
        arguments: {
            page: computed(() => page.value),
        }
    })
</script>

<template lang="pug">
    q-card.q-pa-sm
        div {{ var1 }}
        div test test {{ page }}
        .row
            q-btn(color="primary" @click="page--" :disable="page === 1") <<
            q-btn(color="primary" @click="page++" :disable="page === data?.meta?.last_page") >>
        div {{ data }}
</template>
