<script setup lang="tsx">
import type { JsonRpcDocsObject } from '@nailyjs/rpc-docs-protocol'
import { NText } from 'naive-ui'
import Markdown from './markdown.vue'
import type { SchemaTreeOption, TreeRenderProps } from '~/types'

const { currentDoc = {} as JsonRpcDocsObject } = defineProps<{
  currentDoc: JsonRpcDocsObject
}>()

const treeOptions = ref<SchemaTreeOption[]>([])
watch(
  () => currentDoc,
  () => treeOptions.value = useEachParam(currentDoc),
  { immediate: true },
)

function renderLabel(node: TreeRenderProps) {
  return (
    <div class="my2">
      <div class="flex items-baseline gap-2">
        <NText strong class="font-size-4.5">{node.option.label}</NText>
        <NText depth={3}>{node.option.required ? 'required' : 'no required'}</NText>
      </div>
      <div>
        <NText type="secondary">type: </NText>
        <NText>{node.option.schema?.type || 'unknown'}</NText>
      </div>
      <Markdown content={node.option.description || node.option.schema?.description || ''} />
    </div>
  )
}
</script>

<template>
  <NCard v-if="currentDoc.params" title="Parameters">
    <NTree
      :data="treeOptions" block-line :render-label="renderLabel"
      :selectable="false" expand-on-click
    >
      <template #empty>
        <NEmpty description="No Parameters" />
      </template>
    </NTree>
  </NCard>
</template>
