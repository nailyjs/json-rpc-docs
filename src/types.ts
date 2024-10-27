import type { TreeOption } from 'naive-ui'
import type { ViteSSGContext } from 'vite-ssg'
import type { JsonRpcParamsObject } from '@nailyjs/rpc-docs-protocol'

export type UserModule = (ctx: ViteSSGContext) => void

export interface SchemaTreeOption extends TreeOption, JsonRpcParamsObject {
}

export interface TreeRenderProps {
  option: SchemaTreeOption
  checked: boolean
  selected: boolean
}
