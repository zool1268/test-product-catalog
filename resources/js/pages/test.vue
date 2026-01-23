<script setup lang="ts">
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const props = defineProps<{
        var1?: string,
        var2?: string,
    }>()
</script>

<template lang="pug">
    q-card.q-ma-lg.q-pa-md
        div {{ var1 }}
        div test test
        q-btn(color="primary") OK
</template>
