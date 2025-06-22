import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../button/button'
import { ButtonUpload } from '../button-upload/button-upload'
import { useStore, type RootStoreState } from '../../store'
import { Loader } from '../loader/loader'
import style from './drag-and-drop.module.css'

type DragAndDropAreaProps = {
    file: File | null
    errorFile: string | null
    onFileSelect: (file: File | null, errorFile?: string | null) => void
    onReset: () => void
}

export const DragAndDropArea = ({
    file,
    errorFile,
    onFileSelect,
    onReset,
}: DragAndDropAreaProps) => {
    const [buttonText, setButtonText] = useState('Загрузить файл')
    const [buttonDescription, setButtonDescription] = useState(
        'или перетащите сюда'
    )
    const errorAggregation = useStore(
        (store: RootStoreState) => store.errorAggregation
    )
    console.log('errorAggregation ' + errorAggregation)

    const setErrorFile = useStore((store: RootStoreState) => store.setFileError)
    const isLoadingAggregation = useStore(
        (store: RootStoreState) => store.isLoadingAggregation
    )
    console.log('isLoadingAggregation ' + isLoadingAggregation)

    const isSuccessAggregation = useStore(
        (store: RootStoreState) => store.isSuccessAggregation
    )

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (errorAggregation && file) {
            setButtonText(file.name)
            setButtonDescription('упс, что-то не то')
        } else if (!file && !errorFile) {
            setButtonText('Загрузить файл')
            setButtonDescription('или перетащите сюда')
        }
    }, [file, errorFile, errorAggregation])

    const handleFile = (file: File | null) => {
        console.log(file)

        if (file) {
            const isCSV = file.name.toLowerCase().endsWith('.csv')
            if (isCSV) {
                onFileSelect(file, null)
                setButtonText(file.name)
                setButtonDescription('файл загружен')
            } else {
                setErrorFile('Файл должен быть в формате CSV')
                setButtonText(file.name)
                setButtonDescription('упс, что-то не то...')
                console.log(errorFile)
            }
        }
    }

    const onFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0]
            handleFile(selectedFile || null)
        },
        []
    )

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0]
        handleFile(droppedFile || null)
    }, [])

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }, [])

    return (
        <>
            {isLoadingAggregation ? (
                <Loader />
            ) : (
                <div
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    className={style.drop_area}
                >
                    {errorFile ? (
                        <>
                            <div>
                                <ButtonUpload
                                    text={buttonText}
                                    property="error"
                                    onClick={onReset}
                                />
                            </div>
                            <div>{buttonDescription}</div>
                        </>
                    ) : errorAggregation ? (
                        <>
                            <div>
                                <ButtonUpload
                                    text={buttonText}
                                    property="error"
                                    onClick={onReset}
                                />
                            </div>
                            <div>ошибка</div>
                        </>
                    ) : isSuccessAggregation ? (
                        <>
                            <div>
                                <ButtonUpload
                                    text={buttonText}
                                    property="done"
                                    onClick={onReset}
                                />
                            </div>
                            <div>готово</div>
                        </>
                    ) : file ? (
                        <>
                            <div>
                                <ButtonUpload
                                    text={buttonText}
                                    property="process"
                                    onClick={onReset}
                                />
                            </div>
                            <div>{buttonDescription}</div>
                        </>
                    ) : (
                        <>
                            <Button
                                text={buttonText}
                                property="upload"
                                onClick={() => fileInputRef.current?.click()}
                            />
                            <div>{buttonDescription}</div>
                        </>
                    )}

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
            )}
        </>
    )
}
