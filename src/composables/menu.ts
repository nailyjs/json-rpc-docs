import { JsonRpcDataSource } from '@nailyjs/rpc-docs-protocol'
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import { RpcDocsDemo } from '../../mocks/test'

export function useMenuOptions() {
  const currentKey = ref<string>('')
  const dataSource = new JsonRpcDataSource(RpcDocsDemo)
  const options = ref<MenuMixedOption[]>([
    ...dataSource.getAllTags().map(tag => ({
      label: tag,
      key: `${tag}~tag`,
      icon: () => 'i-ph-tag-duotone',
      children: dataSource.getDocByTag(tag).map(([key, doc]) => ({
        label: doc.summary || key,
        key: `${key}~doc`,
        icon: () => 'i-ph-signpost-duotone',
      } as MenuMixedOption)),
    })),
    ...dataSource.getNoTagDoc().map(([key, doc]) => ({
      label: doc.summary || key,
      key: `${key}~doc`,
      icon: () => 'i-ph-signpost-duotone',
    })),
  ])

  function handleUpdateValue(value: string) {
    currentKey.value = value
  }

  function handleProvide() {
    provide('currentKey', currentKey)
    provide('dataSource', dataSource)
    provide('options', options)
    provide('data', RpcDocsDemo)
  }

  function findDoc(menuOptions: MenuMixedOption[]): MenuMixedOption | undefined {
    for (const option of menuOptions) {
      if (option.key === currentKey.value)
        return option
      if (option.children) {
        const result = findDoc(option.children as MenuMixedOption[])
        if (result)
          return result
        else continue
      }
    }
  }

  return {
    handleUpdateValue,
    handleProvide,
    options,
    findDoc,
  }
}
