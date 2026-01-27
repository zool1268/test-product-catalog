<script lang="ts" setup>
import type { AxiosError } from "axios"
import { type ApiError} from '@/utils/api';
import { ref } from 'vue';
import { useQuasar } from "quasar";
import { useAuthStore } from "@/stores/useAuthStore";

const emit = defineEmits(["loggedin"])
const auth = useAuthStore()
const email = ref("")
const password = ref("")

const q = useQuasar()
const onLogin = async () => {
   try {
        await auth.login({email: email.value, password: password.value})
        emit("loggedin")
    } catch (e: unknown) {
        console.log(e)
        const axiosError = e as AxiosError<ApiError>
        if (axiosError.response?.data.errors) { // @todo: привязать ошибки к полям
            q.notify({
                type: "negative",
                message: axiosError.response?.data.errors.message.join(", "),
                position: "bottom",
            })
        }
    }
}
</script>

<template lang="pug">
q-form(@submit.prevent="onLogin")
    .column
        q-input(
            v-model="email"
            type="email"
            placeholder="Email"
            hint="user@tpc.ru"
        )
        q-input.q-my-sm(
            v-model="password"
            type="password"
            placeholder="Password"
            hint="user"
        )
        q-btn(type="submit" color="primary") Войти
</template>
