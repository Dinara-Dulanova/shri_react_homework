import { Link } from 'react-router-dom'
import styles from './headerUI.module.css'

export const HeaderUI = () => {
    return (
        <header className={styles.header}>
            <h1>Это шапка</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">CSV Аналитик</Link>
                    </li>
                    <li>
                        <Link to="/generation">CSV Генератор</Link>
                    </li>
                    <li>
                        <Link to="/history">История</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
