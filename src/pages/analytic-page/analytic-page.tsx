import { DragAndDropArea } from '../../components/drag-and-drop/drag-and-drop'
import { useStore, type RootStoreState } from '../../store'
import { HighlightArray } from '../../components/highlight-array/highlight-array'
import style from './analytic-page.module.css'
import { Button } from '../../components/button/button'

export const AnalyticPage = () => {
    const file = useStore((store: RootStoreState) => store.file)
    const isLoadingAggregation = useStore(
        (store: RootStoreState) => store.isLoadingAggregation
    )
    console.log('PAGE isLoadingAggregation ' + isLoadingAggregation)

    const isSuccessAggregation = useStore(
        (store: RootStoreState) => store.isSuccessAggregation
    )
    const errorAggregation = useStore(
        (store: RootStoreState) => store.errorAggregation
    )
    console.log('err' + errorAggregation)

    const errorFile = useStore((store: RootStoreState) => store.errorFile)
    console.log('file:', file, 'errorFile:', errorFile)
    // const resultChunks = useStore((store: RootStoreState) => store.resultChunks)
    const latestChunk = useStore((store: RootStoreState) => store.latestResult)
    console.log(latestChunk)
    console.log(typeof latestChunk)

    const setFile = useStore((store: RootStoreState) => store.setFile)
    const startProcessing = useStore(
        (store: RootStoreState) => store.startProcessing
    )
    const reset = useStore((store: RootStoreState) => store.reset)

    return (
        <div className={style.container}>
            <div className={style.description}>
                Загрузите csv файл и получите полную информацию о нём
                за сверхнизкое время
            </div>
            <DragAndDropArea
                file={file}
                errorFile={errorFile}
                onFileSelect={setFile}
                onReset={reset}
            />

            <div className={style.center}>
                <Button
                    text="Отправить"
                    property="active"
                    disabled={
                        !file || isLoadingAggregation || isSuccessAggregation
                    }
                    onClick={startProcessing}
                ></Button>
            </div>

            {/* <button
                onClick={startProcessing}
                style={{ marginBottom: '10px' }}
                disabled={!file || isLoadingAggregation || isSuccessAggregation}
            >
                Отправить
            </button> */}

            {/* {!isLoadingAggregation && !isSuccessAggregation && file && (
                <button
                    onClick={startProcessing}
                    style={{ marginBottom: '10px' }}
                >
                    Отправить
                </button>
            )} */}

            {(isLoadingAggregation || isSuccessAggregation) && latestChunk && (
                <>
                    <div>Обработка файла... Пожалуйста, подождите.</div>
                    <HighlightArray highlights={latestChunk} />
                </>
            )}

            {errorAggregation && (
                <div style={{ color: 'red' }}>
                    Ошибка: {errorAggregation}
                    <div>
                        <button onClick={reset} style={{ marginTop: '10px' }}>
                            Попробовать снова
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
