<script setup lang="tsx">
import MarkdownIt from 'markdown-it'
import { NA, NBlockquote, NH1, NH2, NH3, NH4, NH5, NH6, NLi, NOl, NP, NText, NUl } from 'naive-ui' // 假设你有这些自定义的组件

defineOptions({
  components: {
    NH1,
    NH2,
    NH3,
    NH4,
    NH5,
    NH6,
    NText,
    NP,
    NA,
    NUl,
    NOl,
    NLi,
    NBlockquote,
  },
})

const { content = '' } = defineProps<{
  content: string
}>()

// 存储渲染后的组件
const renderedComponents = ref<any[]>([])

// 自定义渲染 Markdown
function renderMarkdown() {
  const md = new MarkdownIt()

  // 解析 markdown 内容，得到 token 列表
  const tokens = md.parse(content, {})

  // 遍历 tokens 并生成对应的 Vue 组件树
  const components = tokens.map((token, index) => {
    if (token.type === 'inline' && token.children) {
      // 处理 inline 类型的 token
      return token.children.map((childToken, childIndex) => {
        return renderToken(childToken, `${index}-${childIndex}`)
      })
    }
    else {
      return renderToken(token, index)
    }
  }).flat()

  // 将生成的组件树存储到 renderedComponents 中
  renderedComponents.value = components || []
}

// 渲染单个 token
function renderToken(token: any, key: string | number) {
  switch (token.type) {
    case 'heading_open':
      // 根据标签类型返回不同的标题组件
      switch (token.tag) {
        case 'h1':
          return <NH1 key={key}>{renderInline(token)}</NH1>
        case 'h2':
          return <NH2 key={key}>{renderInline(token)}</NH2>
        case 'h3':
          return <NH3 key={key}>{renderInline(token)}</NH3>
        case 'h4':
          return <NH4 key={key}>{renderInline(token)}</NH4>
        case 'h5':
          return <NH5 key={key}>{renderInline(token)}</NH5>
        case 'h6':
          return <NH6 key={key}>{renderInline(token)}</NH6>
      }
      break

    case 'paragraph_open':
      return <NP key={key}>{renderInline(token)}</NP>

    case 'link_open':
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      return <NA key={key} href={token.attrGet('href')}>{renderInline(token)}</NA>

    case 'bullet_list_open':
      return <NUl key={key}>{renderInline(token)}</NUl>

    case 'ordered_list_open':
      return <NOl key={key}>{renderInline(token)}</NOl>

    case 'list_item_open':
      return <NLi key={key}>{renderInline(token)}</NLi>

    case 'blockquote_open':
      return <NBlockquote key={key}>{renderInline(token)}</NBlockquote>

    case 'code_inline':
      return <NText key={key} code class="inline">{token.content}</NText>

    case 'strong_open':
      return <NText key={key} strong>{renderInline(token)}</NText>

    case 'em_open':
      return <NText key={key} italic>{renderInline(token)}</NText>

    case 'text':
      return <span key={key}>{token.content}</span>

    default:
      return null
  }
}

// 渲染 inline token 的内容
function renderInline(token: any) {
  if (token.children) {
    return token.children.map((childToken: any, index: number) => renderToken(childToken, `${token.type}-${index}`))
  }
  return token.content
}

watch(() => content, renderMarkdown, { immediate: true })
</script>

<!-- 注册自定义组件 -->
<template>
  <div class="markdown-it">
    <span v-for="(component, index) in renderedComponents" :key="index">
      <component :is="component" />
    </span>
  </div>
</template>
