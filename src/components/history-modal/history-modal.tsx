import style from './history-modal.module.css'
import { Highlight } from '../highlight/highlight'
import type { HighlightArrayProps } from '../../utils/types'

type HistoryModalProps = HighlightArrayProps & {
    onClose: () => void
}

export const HistoryModal = ({ highlights, onClose }: HistoryModalProps) => {
    return (
        <div className={style.modal}>
            <button onClick={onClose}>Close</button>
            <div className={style.highlights}>
                {Object.entries(highlights).map(([key, value], idx) => (
                    <Highlight key={idx} data={value} description={key} />
                ))}
            </div>
        </div>
    )
}
