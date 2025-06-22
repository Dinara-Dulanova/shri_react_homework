import type { IButtonProperty } from '../../utils/types'
import styles from './button.module.css'
type buttonProps = {
    text: string
    property?: IButtonProperty
    disabled?: boolean
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = ({
    text,
    property = 'active',
    disabled = false,
    onClick,
}: buttonProps) => (
    <button
        disabled={disabled}
        className={`${styles.button} ${styles[property]}`}
        onClick={onClick}
    >
        {text}
    </button>
)
