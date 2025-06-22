# Проект на React + TypeScript + Zustand

## Запустить проект

1. Установите зависимости:
   npm install

2. Запустите проект в режиме разработки:
   npm run dev

3. Откройте в браузере:
   http://localhost:5173

---

## Структура проекта

├── public/ # Статические файлы (иконки, index.html и др.)
├── src/
│ ├── assets/ # Медиафайлы (изображения, шрифты и т.д.)
│ ├── components/ # Переиспользуемые React-компоненты
│ │ ├── app # Главный компонент приложения
│ │ ├── button
│ │ ├── button-upload
│ │ ├── drag-and-drop
│ │ ├── header
│ │ ├── highlight
│ │ ├── highlight-array
│ │ ├── history-array
│ │ ├── history-item
│ │ ├── history-modal
│ │ ├── history-modal-item
│ │ ├── loader
│ │ ├── text
│ ├── pages/ # Страницы приложения
│ │ ├── analytic-page # страница дл загрузки и агрегации данных
│ │ ├── history-page # страница с историей обработки данных и файлов
│ │ ├── generation-page # стрница с гкенерацией файла
│ │ ├── not-found-page # страница для 404 (в разработке)
│ ├── store/ # Zustand-сторы и логика состояния
│ │ ├── analyze # слайс для работы и агрегации файла
│ │ ├── generate # слайс для генерации файла
│ │ ├── index.ts # создание стора и сбор слайсов
│ ├── ui
│ ├── utils/ # Вспомогательные функции и утилиты
│ │ ├── api.ts # апи для работы с бекендом (генерация файла и обработка)
│ │ ├── functions.ts # вспомогательные функции
│ │ ├── historyApi.ts # апи для работы с локал стораджем для истории
│ │ ├── types.ts # используемые типы
├── package.json # Конфигурация npm-пакетов
├── tsconfig.json # Конфигурация TypeScript
└── README.md # Документация проекта
