// pages/HistoryPage.tsx
import { useEffect, useState } from 'react'
import {
    clearFileHistory,
    getFileHistory,
    removeFileHistory,
} from '../../utils/historyApi'
import type { IFileHistoryRecord } from '../../utils/types'
import { HistoryArray } from '../../components/history-array/histiry-array'
import { Button } from '../../components/button/button'

export const HistoryPage = () => {
    const [history, setHistory] = useState<IFileHistoryRecord[]>([])

    useEffect(() => {
        const data = getFileHistory()
        setHistory(data)
    }, [])

    const handleDelete = (id: string) => {
        removeFileHistory(id)
        setHistory((history) => history.filter((item) => item.id !== id))
    }

    const handleClear = () => {
        clearFileHistory()
        setHistory([])
    }

    return (
        <div>
            <h2>История загрузок</h2>
            <HistoryArray history={history} onDelete={handleDelete} />
            {Boolean(history.length) && (
                <Button
                    text="Очистить все"
                    property="clear"
                    onClick={handleClear}
                ></Button>
            )}
        </div>
    )
}
