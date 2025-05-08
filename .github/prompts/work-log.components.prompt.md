# 組件開發規格



如果看到是 Input 可以使用 InputBaseFormHook.tsx
如果看到是 下拉選單 可以使用 SelectBaseFormHook.tsx
如果看到是 數字輸入框 可以使用 InputBaseFormHook.tsx
如果看到是 檢核欄位 可以使用 checkBoxBaseFormHook.tsx

如果有使用到 FormHook 組件 ，則可以使用 React-Form-Hook，
並在type資料夾中建立對應的型別檔案，
並在組件中使用 useFormContext() 來取得 FormHook 的資料，
並使用 register() 來註冊欄位，
并使用 formState.errors 來取得欄位的錯誤訊息，
并使用 formState.isSubmitting 來判斷是否正在提交表單，
并使用 formState.isValidating 來判斷是否正在驗證表單。

如果不使用 FormHook 組件，react-template\src\components\RHForm 裡面的組件一樣可以使用，
但props 要傳入 useRHF = false 、value onChange 這三個 props，

如果看到是 RadioButton 可以使用 RadioButton.tsx
如果看到是 有兩種按鈕選擇(左右的按鈕) 可以使用 ToggleButtonGroup.tsx