import { withNaming } from '@bem-react/classname'
import { NAMESPACE } from '../constants'

export const cn = withNaming({ e: '__', m: '_' })
export const block = withNaming({ n: NAMESPACE, e: '__', m: '_' })
