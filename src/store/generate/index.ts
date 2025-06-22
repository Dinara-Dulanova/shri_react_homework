import { getGeneratedCSV } from '../../utils/api'

export type IGenerationState = {
    generation: {
        isLoading: boolean
        isSuccess: boolean
        error: string | null
        startGenerateCSVFile: (params: {
            size?: number
            withErrors?: boolean
            maxSpend?: number
        }) => Promise<void>
        reset: () => void
    }
}

export const createGenerationSlice = (
    set: (fn: (state: any) => any) => void
) => ({
    generation: {
        isLoading: false,
        isSuccess: false,
        error: null,
        startGenerateCSVFile: async ({
            size = 0.1,
            withErrors = false,
            maxSpend = 1000,
        }) => {
            set((state) => ({
                generation: {
                    ...state.generation,
                    isLoading: true,
                    isSuccess: false,
                    error: null,
                },
            }))

            try {
                const file = await getGeneratedCSV({
                    size,
                    withErrors,
                    maxSpend,
                })

                const url = window.URL.createObjectURL(file)
                const a = document.createElement('a')
                a.href = url
                a.download = 'report.csv'
                a.click()
                window.URL.revokeObjectURL(url)
                set((state) => ({
                    generation: {
                        ...state.generation,
                        isLoading: false,
                        isSuccess: true,
                    },
                }))
            } catch (error) {
                const message =
                    error instanceof Error
                        ? error.message
                        : 'Неизвестная ошибка'
                set((state) => ({
                    generation: {
                        ...state.generation,
                        isLoading: false,
                        error: message,
                    },
                }))
            }
        },
        reset: () => {
            set((state) => ({
                generation: {
                    ...state.generation,
                    isLoading: false,
                    isSuccess: false,
                    error: null,
                },
            }))
        },
    },
})
