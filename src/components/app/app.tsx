import '../../index.css'
import styles from './app.module.css'
import { Header } from '../header/header'
import { AnalyticPage } from '../../pages/analytic-page/analytic-page'
import { GenerationPage } from '../../pages/generation-page/generation-page'
import { HistoryPage } from '../../pages/history-page/history-page'
import { NotFoundPage } from '../../pages/not-found-page/not-found-page'
import { Route, Routes } from 'react-router-dom'

export const App = () => (
    <div className={styles.app}>
        <Header />
        <Routes>
            <Route path="/" element={<AnalyticPage />} />
            {/* <Route index element={<AnalyticPage />} /> */}
            <Route path="generation" element={<GenerationPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
)

export default App
