import type { IButtonUploadProperty } from '../../utils/types'
import styles from './button-upload.module.css'
type buttonUploadProps = {
    text: string
    property?: IButtonUploadProperty
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const ButtonUpload = ({
    text,
    property = 'active',
    onClick,
}: buttonUploadProps) => (
    <>
        <div>{text}</div>
        <button
            className={`${styles.button} ${styles[property]}`}
            onClick={onClick}
        >
            Х
        </button>
    </>
)
