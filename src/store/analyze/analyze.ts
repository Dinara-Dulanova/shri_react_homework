import { postAggregateFile } from '../../utils/api'
import { parseHighlight } from '../../utils/functions'
import { addFileHistory } from '../../utils/historyApi'

export type IAnalyzeState = {
    file: File | null
    isLoadingFile: boolean
    isSuccessFile: boolean
    errorFile: string | null

    rows: number
    isLoadingAggregation: boolean
    isSuccessAggregation: boolean
    errorAggregation: string | null

    latestResult: Record<string, any> | null

    setFile: (file: File | null, errorFile?: string | null) => void
    setFileError: (error: string) => void
    reset: () => void
    startProcessing: () => Promise<void>
}

type SetState = (
    partial:
        | Partial<IAnalyzeState>
        | ((state: IAnalyzeState) => Partial<IAnalyzeState>)
) => void
type GetState = () => IAnalyzeState

export const createAnalyzeSlice = (
    set: SetState,
    get: GetState
): IAnalyzeState => ({
    file: null,
    isLoadingFile: false,
    isSuccessFile: false,
    errorFile: null,
    rows: 10000,
    isLoadingAggregation: false,
    isSuccessAggregation: false,
    errorAggregation: null,
    latestResult: null,

    setFile: (file: File | null, errorFile: string | null = null) => {
        set(() => ({
            file,
            errorFile,
            isLoadingFile: false,
            isSuccessFile: false,
        }))
    },
    setFileError: (error: string) => {
        set(() => ({
            errorFile: error,
            isLoadingFile: false,
            isSuccessFile: false,
        }))
    },

    reset: () =>
        set(() => ({
            file: null,
            isLoadingFile: false,
            isSuccessFile: false,
            errorFile: null,
            isLoadingAggregation: false,
            isSuccessAggregation: false,
            errorAggregation: null,
            latestResult: null,
        })),

    startProcessing: async () => {
        const { file, rows } = get()
        if (!file) {
            set(() => ({ errorFile: 'Файл не выбран' }))
            return
        }

        set(() => ({
            isLoadingFile: true,
            isSuccessFile: false,
            errorFile: null,
            isLoadingAggregation: false,
            isSuccessAggregation: false,
            errorAggregation: null,
            latestResult: null,
        }))
        console.log('Отправляем файл на сервер...')

        try {
            set((state) => ({
                ...state,
                isLoadingAggregation: true,
            }))
            const response = await postAggregateFile({ file, rows })

            if (!response.body) {
                set(() => ({
                    isLoadingFile: false,
                    isSuccessFile: false,
                    errorFile: 'Нет тела ответа от сервера',
                }))
                addFileHistory({
                    id: Date.now().toString(),
                    fileName: file.name,
                    date: new Date().toISOString(),
                    status: 'error',
                    error: 'Нет тела ответа от сервера',
                })
                return
            }

            set(() => ({
                isLoadingFile: true,
                isSuccessFile: true,
                errorFile: null,
                isLoadingAggregation: true,
                isSuccessAggregation: false,
                errorAggregation: null,
            }))

            const stream = response.body.pipeThrough(new TextDecoderStream())
            const reader = stream.getReader()
            let buffer = ''

            while (true) {
                const { done, value } = await reader.read()

                if (done) {
                    if (buffer.trim()) {
                        try {
                            const parsed = JSON.parse(buffer)
                            const parsedModified = parseHighlight(parsed)

                            console.log(parsedModified)

                            set((state) => ({
                                latestResult: {
                                    ...state.latestResult,
                                    ...parsedModified,
                                },
                            }))
                        } catch (e: unknown) {
                            set(() => ({
                                isLoadingFile: false,
                                isSuccessFile: false,
                                errorFile: 'error',
                                isLoadingAggregation: false,
                                isSuccessAggregation: false,
                                errorAggregation:
                                    e instanceof Error
                                        ? e.message
                                        : 'Ошибка обработки',
                            }))
                            // ignore
                        }
                    }
                    break
                }

                buffer += value
                const lines = buffer.split('\n')
                buffer = lines.pop() || ''

                for (const line of lines) {
                    if (line.trim()) {
                        try {
                            const parsed = JSON.parse(line)
                            const parsedModified = parseHighlight(parsed)
                            console.log(parsedModified)

                            set((state) => ({
                                latestResult: {
                                    ...state.latestResult,
                                    ...parsedModified,
                                },
                            }))
                        } catch (error: unknown) {
                            set(() => ({
                                isLoadingFile: false,
                                isSuccessFile: false,
                                errorFile: 'error',
                                isLoadingAggregation: false,
                                isSuccessAggregation: false,
                                errorAggregation:
                                    error instanceof Error
                                        ? error.message
                                        : 'Ошибка обработки',
                            }))
                            addFileHistory({
                                id: Date.now().toString(),
                                fileName: file.name,
                                date: new Date().toISOString(),
                                status: 'error',
                                error:
                                    error instanceof Error
                                        ? error.message
                                        : 'Ошибка обработки',
                            })
                        }
                    }
                }
            }

            set(() => ({
                isLoadingAggregation: false,
                isSuccessAggregation: true,
                errorAggregation: null,
            }))
            addFileHistory({
                id: Date.now().toString(),
                fileName: file.name,
                date: new Date().toISOString(),
                status: 'success',
                highlights: get().latestResult ?? {},
            })
        } catch (e: unknown) {
            set(() => ({
                isLoadingFile: false,
                isSuccessFile: false,
                errorFile: 'error',
                isLoadingAggregation: false,
                isSuccessAggregation: false,
                errorAggregation:
                    e instanceof Error ? e.message : 'Ошибка обработки',
            }))
            addFileHistory({
                id: Date.now().toString(),
                fileName: file.name,
                date: new Date().toISOString(),
                status: 'error',
                error: e instanceof Error ? e.message : 'Ошибка обработки',
            })
        }
    },
})
