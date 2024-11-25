import { computed, useAttrs } from 'vue'
import { block } from '../utils/cn'
import { omit } from '../utils/omit'

export function useBlock(key: string) {
  const _attrs = useAttrs()

  const b = block(key)

  const attrs = computed(() => omit(_attrs, 'class'))

  return {
    b,
    attrs,
  }
}

export type UseBlockReturn = ReturnType<typeof useBlock>
