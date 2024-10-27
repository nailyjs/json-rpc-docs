<script setup lang="tsx">
import type { JsonRpcDocsObject } from '@nailyjs/rpc-docs-protocol'

const { currentDoc = {} as JsonRpcDocsObject } = defineProps<{
  currentDoc: JsonRpcDocsObject
}>()
</script>

<template>
  <div v-if="currentDoc.tags && currentDoc.tags.length !== 0" mb-5>
    <NText>Tags: </NText>
    <NTag v-for="(item, index) in currentDoc.tags || []" :key="index" type="primary" size="small">
      {{ item }}
    </NTag>
  </div>
</template>
