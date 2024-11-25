import type { AvatarSize } from './types'

export const avatarSizeToImgSize: Record<AvatarSize, number> = {
  xs: 24,
  s: 28,
  m: 32,
  l: 42,
  xl: 50,
}

export const avatarSizeToIconSize: Record<AvatarSize, number> = {
  xs: 14,
  s: 16,
  m: 16,
  l: 20,
  xl: 24,
}
