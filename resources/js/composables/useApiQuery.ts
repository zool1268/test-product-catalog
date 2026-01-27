import api from "@/utils/api";
import { ApiError } from "@/utils/api";
import { Ref, ref, toRef, watch } from "vue";
import type { AxiosError } from "axios"
import { useQuasar } from "quasar";

export interface ApiResponse {
    data: any,
    meta?: {
        total_count?: number,
        current_page?: number,
        last_page?: number,
    }
}

export interface QueryConfig<T = any> {
    arguments?: T | Ref<T> | (() => T)
    noAutoExecute?: boolean
    immediate?: boolean
    deep?: boolean
    onSuccess?: (data: any) => void
    onError?: (error: AxiosError<ApiError>) => void
    transform?: (data: any) => any
}

export default function useApiQuery<T = any, R = any>(url: string, config: QueryConfig<T> = {}) {
    const {
        noAutoExecute = false,
        immediate = true,
        deep = true,
        onSuccess,
        onError,
        transform
    } = config

    const params = ref<T>(config.arguments as T)
    const loading = ref(false)
    const error = ref<AxiosError<ApiError> | null>(null)
    const data = ref<R | null>(null)

    const $q = useQuasar()

    const argsRef = typeof config.arguments === 'function'
        ? config.arguments
        : toRef(() => config.arguments) as Ref<T> | (() => T)

    if (config.arguments && !noAutoExecute) {
        watch(argsRef, async (newVal) => {
            params.value = newVal
            await execute()
        }, { deep, immediate })
    }

    if (!noAutoExecute && immediate) {
        execute()
    }

    async function execute(newParams?: T): Promise<R | null> {
        try {
            loading.value = true
            error.value = null

            const requestParams = newParams || params.value
            console.log('Executing query:', url, 'params:', requestParams)

            const response = await api.get(url, {
                params: requestParams
            })

            const result = transform ? transform(response.data) : response.data
            data.value = result

            if (onSuccess) {
                onSuccess(result)
            }

            return result
        } catch (err: unknown) {
            const axiosError = err as AxiosError<ApiError>
            error.value = axiosError

            if (onError) {
                onError(axiosError)
            } else {
                const message = axiosError.response?.data?.message
                    || axiosError.message
                    || `Ошибка запроса ${url}`
                $q.notify({
                    type: 'negative',
                    message,
                    position: 'bottom',
                    timeout: 5000
                })
           }
           throw err
         } finally {
            loading.value = false
        }
    }

    function reset() {
        data.value = null
        error.value = null
        loading.value = false
    }

    function updateParams(newParams: Partial<T>) {
        params.value = { ...params.value, ...newParams } as T
    }

    return {
        data,
        loading,
        error,
        execute,
        reset,
        updateParams,
        params
    }
}
