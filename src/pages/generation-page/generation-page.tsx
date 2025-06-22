import { useStore, type RootStoreState } from '../../store'
import { Text } from '../../components/text/text'
import { Button } from '../../components/button/button'
import { Loader } from '../../components/loader/loader'
import { ButtonUpload } from '../../components/button-upload/button-upload'

export const GenerationPage = () => {
    const { isLoading, isSuccess, error, startGenerateCSVFile, reset } =
        useStore((store: RootStoreState) => store.generation)

    const handleClick = () => {
        console.log('started generation')

        startGenerateCSVFile({
            size: 0.1,
            withErrors: false,
            maxSpend: 1000,
        })
    }

    return (
        <div>
            <Text text="Сгенерируйте готовый csv-файл нажатием одной кнопки"></Text>
            {!isLoading && !isSuccess && !error && (
                <Button
                    text="Начать генерацию"
                    property="active"
                    onClick={handleClick}
                ></Button>
            )}

            {isLoading && (
                <>
                    <Loader></Loader>
                    <Text text="идёт процесс генерации"></Text>
                </>
            )}
            {isSuccess && (
                <>
                    <ButtonUpload
                        text="Done"
                        property="done"
                        onClick={reset}
                    ></ButtonUpload>
                    <Text text="Файл сгенерирован"></Text>
                </>
            )}

            {error && (
                <>
                    <ButtonUpload
                        text="Ошибка"
                        property="error"
                        onClick={reset}
                    ></ButtonUpload>
                    <Text text="упс, не то..."></Text>
                </>
            )}
        </div>
    )
}
