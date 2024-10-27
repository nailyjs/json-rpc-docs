<script setup lang="tsx">
import type { JsonRpcDocsObject } from '@nailyjs/rpc-docs-protocol'
import { js_beautify } from 'js-beautify'
import { useMessage } from 'naive-ui'

const { currentDoc = {} } = defineProps<{
  currentDoc: JsonRpcDocsObject
}>()

const { copy, copied } = useClipboard({ legacy: true })
const message = useMessage()
watch(copied, v => v ? message.success('Copied') : null)
const beautifyDoc = computed(() => js_beautify(JSON.stringify(currentDoc), { indent_size: 2 }))
</script>

<template>
  <NCard v-if="currentDoc && Object.keys(currentDoc).length" title="Schema">
    <NScrollbar x-scrollable>
      <NCode :code="beautifyDoc" language="json" trim show-line-numbers />
    </NScrollbar>
    <template #header-extra>
      <NButton type="primary" size="small" round @click="copy(beautifyDoc)">
        Copy
      </NButton>
    </template>
  </NCard>
</template>
