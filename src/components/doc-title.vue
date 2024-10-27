<script setup lang="tsx">
import type { JsonRpcDocsObject } from '@nailyjs/rpc-docs-protocol'

const { currentDoc = {} as JsonRpcDocsObject } = defineProps<{
  currentDoc: JsonRpcDocsObject
}>()
const currentKey = inject<string>('currentKey')!
</script>

<template>
  <div flex flex-col>
    <div flex flex-wrap items-baseline gap-x-5>
      <NH1 m0 p0 class="title">
        <Markdown :content="currentDoc.summary || currentKey.split('~')[0]" />
      </NH1>
      <NText v-if="currentDoc.summary" font-size-4.5 :depth="3">
        {{ currentKey.split('~')[0] }}
      </NText>
    </div>
  </div>
</template>

<style scoped>
.title * {
  display: inline;
}
</style>
