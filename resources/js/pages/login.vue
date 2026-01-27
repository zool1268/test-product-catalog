<script setup lang="ts">
import { router } from '@inertiajs/vue3';
</script>

<template lang="pug">
    login-form(
        @loggedin="router.visit('/')"
    )
</template>
