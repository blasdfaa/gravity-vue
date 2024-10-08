/**
 * Simple custom hook to generate unique ids
 * Workaround until Vue 3.5.0 is released
 * @see https://x.com/youyuxi/status/1745379112456429688
 */
let count = 0

export function useId(id?: string | null | undefined, prefix = 'g') {
  return id || `${prefix}-${count++}`
}
