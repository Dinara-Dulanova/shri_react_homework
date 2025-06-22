import type { IHighlightItem } from '../../utils/types'
import style from './highlight.module.css'

export const Highlight = ({
    data,
    description,
    variant = 'default',
}: IHighlightItem) => {
    const containerClass = [
        style.container,
        variant === 'modal' ? style.modalVariant : style.defaultVariant,
    ].join(' ')

    return (
        <div className={containerClass}>
            <p>{data}</p>
            <p>{description}</p>
        </div>
    )
}
