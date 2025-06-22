import type { IFileHistoryRecord } from '../../utils/types'
import { HistoryItem } from '../history-item/histiry-item'
import style from './history-array.module.css'

type HistoryArrayProps = {
    history: IFileHistoryRecord[]
    onDelete: (id: string) => void
}

export const HistoryArray = ({ history, onDelete }: HistoryArrayProps) => {
    return (
        <div className={style.list}>
            {history.map((item) => (
                <HistoryItem
                    key={item.id}
                    highlights={item.highlights}
                    {...item}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}
