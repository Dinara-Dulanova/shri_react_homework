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

├── public/ # Статические файлы (иконки, index.html и др.)<br />
├── src/<br />
│ ├── assets/ # Медиафайлы (изображения, шрифты и т.д.)<br />
│ ├── components/ # Переиспользуемые React-компоненты<br />
│ │ ├── app # Главный компонент приложения<br />
│ │ ├── button<br />
│ │ ├── button-upload<br />
│ │ ├── drag-and-drop<br />
│ │ ├── header<br />
│ │ ├── highlight<br />
│ │ ├── highlight-array<br />
│ │ ├── history-array<br />
│ │ ├── history-item<br />
│ │ ├── history-modal<br />
│ │ ├── history-modal-item<br />
│ │ ├── loader<br />
│ │ ├── text<br />
│ ├── pages/ # Страницы приложения<br />
│ │ ├── analytic-page # страница дл загрузки и агрегации данных<br />
│ │ ├── history-page # страница с историей обработки данных и файлов<br />
│ │ ├── generation-page # стрница с гкенерацией файла<br />
│ │ ├── not-found-page # страница для 404 (в разработке)<br />
│ ├── store/ # Zustand-сторы и логика состояния<br />
│ │ ├── analyze # слайс для работы и агрегации файла<br />
│ │ ├── generate # слайс для генерации файла<br />
│ │ ├── index.ts # создание стора и сбор слайсов<br />
│ ├── ui<br />
│ ├── utils/ # Вспомогательные функции и утилиты<br />
│ │ ├── api.ts # апи для работы с бекендом (генерация файла и обработка)<br />
│ │ ├── functions.ts # вспомогательные функции<br />
│ │ ├── historyApi.ts # апи для работы с локал стораджем для истории<br />
│ │ ├── types.ts # используемые типы<br />
├── package.json # Конфигурация npm-пакетов<br />
├── tsconfig.json # Конфигурация TypeScript<br />
└── README.md # Документация проекта<br />
