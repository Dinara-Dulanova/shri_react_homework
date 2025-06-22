import type { HighlightArrayProps } from '../../utils/types'
import { Highlight } from '../highlight/highlight'
import style from './highlight-array.module.css'

export const HighlightArray = ({ highlights }: HighlightArrayProps) => {
    return (
        <div className={style.container}>
            {Object.entries(highlights).map(([key, value], idx) => (
                <Highlight key={idx} data={value} description={key} />
            ))}
        </div>
    )
}
