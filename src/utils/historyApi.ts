import type { IFileHistoryRecord } from './types'

const STORAGE_KEY = 'fileHistory'

// Получить всю историю
export function getFileHistory(): IFileHistoryRecord[] {
    console.log('getFileHistory')
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? (JSON.parse(data) as IFileHistoryRecord[]) : []
}

// Сохранить всю историю
function saveFileHistory(history: IFileHistoryRecord[]): void {
    console.log('saveFileHistory')
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    console.log(getFileHistory())
}

// Добавить новую запись
export function addFileHistory(record: IFileHistoryRecord): void {
    console.log('addFileHistory')
    const history = getFileHistory()
    console.log(history)

    history.push(record) // добавляем новую запись
    saveFileHistory(history)
}

// Удалить запись по id
export function removeFileHistory(id: string): void {
    const history = getFileHistory()
    const newHistory = history.filter((item) => item.id !== id)
    saveFileHistory(newHistory)
}

// Очистить всю историю
export function clearFileHistory(): void {
    localStorage.removeItem(STORAGE_KEY)
}
