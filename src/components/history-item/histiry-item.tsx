import { useState } from 'react'
import type { IFileHistoryRecord } from '../../utils/types'
import style from './history-item.module.css'
import { createPortal } from 'react-dom'
import { HistoryModal } from '../history-modal/history-modal'

type HistoryItemProps = IFileHistoryRecord & {
    onDelete: (id: string) => void
}

export const HistoryItem = ({
    id,
    fileName,
    date,
    status,
    highlights,
    onDelete,
}: HistoryItemProps) => {
    const [showModal, setShowModal] = useState(false)

    // Открывать модалку только если статус success
    const handleOpenModal = () => {
        if (status === 'success') {
            setShowModal(true)
        }
    }

    return (
        <>
            <div
                className={style.container}
                onClick={handleOpenModal}
                style={{ cursor: status === 'success' ? 'pointer' : 'default' }}
            >
                <p>{fileName}</p>
                <p>{date}</p>
                <p
                    className={
                        status === 'success' ? style.success : style.inactive
                    }
                >
                    Обработан успешно
                </p>
                <p
                    className={
                        status === 'error' ? style.error : style.inactive
                    }
                >
                    Не удалось обработать
                </p>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete(id)
                    }}
                >
                    Удалить
                </button>
            </div>
            {showModal &&
                createPortal(
                    <HistoryModal
                        highlights={highlights ?? {}}
                        onClose={() => setShowModal(false)}
                    />,
                    document.body
                )}
        </>
    )
}
