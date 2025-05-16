/**
 * 儲存資料至 localStorage
 * @param key - 鍵值名稱
 * @param value - 要儲存的資料（會自動轉成 JSON 字串）
 */
export function setItem<T = unknown>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.warn(`[setItem] Failed to stringify value for key: ${key}`, error)
  }
}

/**
 * 從 localStorage 安全取得資料
 * @param key - 鍵值名稱
 * @returns 對應的值（已轉型），若無或錯誤則回傳 null
 */
export function getItem<T = unknown>(key: string): T | null {
  try {
    const rawValue = localStorage.getItem(key)
    return rawValue ? (JSON.parse(rawValue) as T) : null
  } catch (error) {
    console.warn(`[getItem] Failed to parse value for key: ${key}`, error)
    return null
  }
}

/**
 * 移除 localStorage 中的指定鍵值
 * @param key - 要移除的鍵名
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.warn(`[removeItem] Failed to remove key: ${key}`, error)
  }
}

/**
 * 清除所有 localStorage 資料（除非你有 whitelist）
 */
export function clearStorage(): void {
  try {
    localStorage.clear()
  } catch (error) {
    console.warn(`[clearStorage] Failed to clear localStorage`, error)
  }
}
