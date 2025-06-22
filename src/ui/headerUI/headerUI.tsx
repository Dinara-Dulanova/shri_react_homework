import styles from './headerUI.module.css'
import logoImg from '../../images/Logo+Name.png'
import upload from '../../images/mage_upload.png'
import genImg from '../../images/Vector.png'
import historyImg from '../../images/Group (1).png'
import { RouteLink } from '../../components/route-link/route-link'

export const HeaderUI = () => {
    return (
        <header className={styles.header}>
            <img src={logoImg} alt="logo" />
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <RouteLink to="/">
                            <img
                                src={upload}
                                alt="Логотип"
                                width={32}
                                height={32}
                            />
                            CSV Аналитик
                        </RouteLink>
                    </li>
                    <li className={styles.navItem}>
                        <RouteLink to="/generation">
                            <img
                                src={genImg}
                                alt="Логотип"
                                width={32}
                                height={32}
                            />
                            CSV Генератор
                        </RouteLink>
                    </li>
                    <li className={styles.navItem}>
                        <RouteLink to="/history">
                            <img
                                src={historyImg}
                                alt="Логотип"
                                width={32}
                                height={32}
                            />
                            История
                        </RouteLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
