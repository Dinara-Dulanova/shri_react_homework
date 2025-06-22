const BASE_URL = 'http://localhost:3000'

type GenerateCSVParams = {
    size: number
    withErrors?: boolean
    maxSpend?: number
}

export const getGeneratedCSV = ({
    size,
    withErrors = false,
    maxSpend = 1000,
}: GenerateCSVParams) => {
    console.log(size)

    const query = new URLSearchParams({
        size: size.toString(),
        withErrors: withErrors ? 'on' : 'off',
        maxSpend: maxSpend.toString(),
    })

    return fetch(`${BASE_URL}/report?${query.toString()}`, {
        method: 'GET',
    }).then((res) => {
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`)
        return res.blob()
    })
}

type AggregateParams = {
    file: File
    rows: number
}

export const postAggregateFile = async ({ file, rows }: AggregateParams) => {
    console.log('Отправляем файл на сервер...')

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${BASE_URL}/aggregate?rows=${rows}`, {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
        },
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Ошибка API: ${response.status} ${errorText}`)
    }

    console.log('Получен ответ от API:', response)

    return response
}
