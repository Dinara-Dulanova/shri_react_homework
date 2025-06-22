// const descriptions: Record<string, string> = {
//     rows_affected: 'количество обработанных записей',
//     average_spend_galactic: 'средние расходы в галактических кредитах',
//     total_spend_galactic: 'общие расходы в галактических кредитах',
//     big_spent_at: 'день года с максимальными расходами',
//     big_spent_civ: 'цивилизация с максимальными расходами',
//     big_spent_value: 'максимальная сумма расходов за день',
//     less_spent_at: 'день года с минимальными расходами',
//     less_spent_civ: 'цивилизация с минимальными расходами',
//     less_spent_value: 'минимальная сумма расходов за день',
// }

export const parseHighlightDescription = (data: string) => {
    return descriptions[data]
}

const descriptions: Record<string, string> = {
    rows_affected: 'количество обработанных записей',
    average_spend_galactic: 'средние расходы в галактических кредитах',
    total_spend_galactic: 'общие расходы в галактических кредитах',
    big_spent_at: 'день года с максимальными расходами',
    big_spent_civ: 'цивилизация с максимальными расходами',
    big_spent_value: 'максимальная сумма расходов за день',
    less_spent_at: 'день года с минимальными расходами',
    less_spent_civ: 'цивилизация с минимальными расходами',
    less_spent_value: 'минимальная сумма расходов за день',
}

function dayOfYearToDate(day: number): string {
    const base = new Date(2025, 0, 1)
    base.setDate(base.getDate() + day)
    return base.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

export const parseHighlight = (
    raw: Record<string, any>
): Record<string, any> => {
    const result: Record<string, any> = {}
    for (const key in raw) {
        if (descriptions[key]) {
            let value = raw[key]
            if (key === 'big_spent_at' || key === 'less_spent_at') {
                value = dayOfYearToDate(value)
            } else if (typeof value === 'number') {
                value = Math.round(value)
            }
            result[descriptions[key]] = value
        }
    }
    return result
}

// const input_data = {
//     total_spend_galactic: 14355062663.5,
//     rows_affected: 28689600,
//     average_spend_galactic: 500.35771371856003,
//     less_spent_at: 190,
//     big_spent_at: 157,
//     less_spent_value: 38785759.5,
//     big_spent_value: 39884046.5,
//     big_spent_civ: 'monsters',
//     less_spent_civ: 'humans',
// }
// const formatted = parseHighlight(input_data)
// console.log(formatted)
