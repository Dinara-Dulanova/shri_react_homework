import style from './loader.module.css'
import loaderImg from '../../images/Group.png'
export const Loader = () => {
    return (
        <div className={style.loader}>
            <img
                className={style.loaderImg}
                src={loaderImg}
                alt="loading image"
            />
        </div>
    )
}
