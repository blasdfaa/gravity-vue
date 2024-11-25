import { inject, provide } from 'vue'

type CreateContextReturn<T> = [
  (fallback?: T) => T,
  (opts: T) => void,
  symbol,
]

export function createContext<T>(id: string) {
  const key = Symbol(id)
  const provider = (value: T) => provide(key, value)
  const injecter = (fallback?: T) => inject(key, fallback)

  return [injecter, provider, key] as CreateContextReturn<T>
}
