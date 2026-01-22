
import axios from "axios"
import { readonly, ref } from "vue"


export function useConfig() {
    const config = ref(null)
    const loading = ref(false)
    const error = ref('')

    const loadConfig = async () => {
        loading.value = true
        try {
            config.value = (await axios.get('/api/config')).data
        } catch (err) {
            error.value = err as string
        } finally {
            loading.value = false
        }
    }

    const get = (name: string, defaultValue = null) => {
        return config.value ? config.value[name] || defaultValue : defaultValue
    }

    if (!config.value && !error.value) {
        loadConfig()
    }

    return {
        config: readonly(config),
        loading: readonly(loading),
        error: readonly(error),
        loadConfig,
        get
    }
}
