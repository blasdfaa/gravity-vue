export function omit<
  T extends object,
  K extends [...(keyof T)[]],
>(data: T, ...keys: K) {
  const copy = {} as { [K in keyof typeof data]: (typeof data)[K] }
  let key: keyof typeof data

  for (key in data) {
    if (!keys.includes(key)) {
      copy[key] = data[key]
    }
  }

  return copy
}
