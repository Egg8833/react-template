# React + TypeScript + Vite + Mui + UnoCss

此專案是一個基於 React、TypeScript、Vite 的模板，整合了 Material-UI 和 UnoCSS，適合快速構建現代化的前端應用。

## 功能特性
- **React 19**：最新版本的 React，支持最新的功能。
- **TypeScript**：提供靜態類型檢查，提升代碼質量。
- **Vite**：快速的開發伺服器和構建工具。
- **Material-UI**：現代化的 UI 組件庫。
- **UnoCSS**：高效的原子化 CSS 工具。
- **React Hook Form + Zod**：表單驗證和管理。
- **Zustand**：輕量級的狀態管理工具。
- **React Query**：數據請求和緩存管理。
- **Vitest**：單元測試框架，支持 React 組件測試。

## 安裝與啟動
1. 安裝依賴：
   ```bash
   npm install
   ```
2. 啟動開發伺服器：
   ```bash
   npm run dev
   ```
3. 構建專案：
   ```bash
   npm run build
   ```
4. 預覽構建結果：
   ```bash
   npm run preview
   ```
5. 執行測試：
   ```bash
   npm run test
   ```

## 目錄結構
```
react-template/
├── src/
│   ├── components/       # 可重用的 React 組件
│   ├── constants/        # 常量定義
│   ├── hooks/            # 自定義 Hook
│   ├── layout/           # 頁面佈局
│   ├── lib/              # 第三方庫的封裝
│   ├── pages/            # 頁面組件
│   ├── store/            # Zustand 狀態管理
│   ├── type/             # TypeScript 類型定義
│   ├── App.tsx           # 應用的入口組件
│   ├── main.tsx          # 應用的主入口
│   └── index.css         # 全局樣式
├── tests/                # 測試文件
├── public/               # 靜態資源
├── package.json          # 項目依賴和腳本
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # Vite 配置
└── README.md             # 使用說明
```

## 測試
本專案使用 Vitest 作為測試框架，並結合 Testing Library 測試 React 組件。
- 執行所有測試：
  ```bash
  npm run test
  ```
- 啟動測試 UI：
  ```bash
  npm run test:ui
  ```

## 開發建議
- 使用 `Zustand` 管理全局狀態。
- 使用 `React Query` 處理數據請求和緩存。
- 使用 `React Hook Form` 和 `Zod` 驗證表單數據。
- 使用 `Material-UI` 快速構建 UI。
- 使用 `UnoCSS` 實現高效的樣式管理。

## 貢獻
歡迎提交 Issue 或 Pull Request，幫助改進此模板。
