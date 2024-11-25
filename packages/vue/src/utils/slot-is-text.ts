import { type Slot, Text } from 'vue'

export function slotIsText(slot?: Slot) {
  if (!slot) return false
  return slot().every(vnode => vnode.type === Text && typeof vnode.children === 'string')
}
