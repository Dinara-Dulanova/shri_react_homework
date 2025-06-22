import type { IButtonProperty } from '../../utils/types'
import styles from './button.module.css'
type buttonProps = {
    text: string
    property?: IButtonProperty
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ text, property = 'active', onClick }: buttonProps) => (
    <button
        className={`${styles.button} ${styles[property]}`}
        onClick={onClick}
    >
        {text}
    </button>
)
