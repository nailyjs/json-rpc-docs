<script setup lang="ts">
import type { JsonRpcDoc, JsonRpcDocsObject } from '@nailyjs/rpc-docs-protocol'
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'

const currentKey = inject<Ref<string>>('currentKey')!
const options = inject<Ref<MenuMixedOption[]>>('options')!
const docs = inject<JsonRpcDoc>('data')!
const currentDoc = ref<JsonRpcDocsObject>({} as JsonRpcDocsObject)

function findDoc(menuOptions: MenuMixedOption[]): MenuMixedOption | undefined {
  for (const option of menuOptions) {
    if (option.key === currentKey.value)
      return option
    if (option.children) {
      const result = findDoc(option.children as MenuMixedOption[])
      if (result)
        return result
    }
  }
}

watch(currentKey, () => {
  const result = findDoc(options.value)
  if (result && result.key)
    currentDoc.value = docs.docs[result.key.toString().split('~')[0]]
}, { immediate: true })
</script>

<template>
  <div>
    <DocTitle mb-5 :current-doc="currentDoc" />
    <Markdown v-if="currentDoc.description" mb-2 :content="currentDoc.description" />
    <DocTag mb-5 :current-doc="currentDoc" />
    <ParamCard mb-5 :current-doc="currentDoc" />
    <SchemaCard :current-doc="currentDoc" />
  </div>
</template>

<route lang="yaml">
meta:
  defaultPadding: true
</route>
