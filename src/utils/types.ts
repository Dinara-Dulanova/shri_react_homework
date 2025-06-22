export type IButtonProperty =
    | 'active'
    | 'unactive'
    | 'download'
    | 'clear'
    | 'upload'
export type IButtonUploadProperty = 'active' | 'process' | 'done' | 'error'

export type IHighlightItem = {
    data: string | number
    description: string
    variant?: 'modal' | 'default'
}

export type IFileHistoryRecord = {
    id: string
    fileName: string
    date: string
    status: 'success' | 'error'
    highlights?: Record<string, any>
    error?: string // текст ошибки, если status === 'error'
}

export type HighlightArrayProps = {
    highlights: Record<string, any>
}
