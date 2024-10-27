<script setup lang="tsx">
import type { MenuOption } from 'naive-ui/es/menu/src/interface'
import { NEllipsis } from 'naive-ui'

const { width: windowWidth } = useWindowSize()
const route = useRoute()
const { handleUpdateValue, options, handleProvide } = useMenuOptions()
handleProvide()

function renderIcon(option: MenuOption) {
  return <div class={`${option.icon?.() as unknown as string} font-size-4.5`} />
}

function renderLabel(option: MenuOption) {
  return <NEllipsis>{option.label}</NEllipsis>
}
</script>

<template>
  <NLayout has-sider fixed left-0 top-0 h-full w-full>
    <NLayoutSider
      bordered :show-trigger="windowWidth > 768 ? 'arrow-circle' : 'bar'"
      :collapsed-width="windowWidth > 768 ? 50 : 0"
      :position="windowWidth > 768 ? 'static' : 'absolute'"
      :collapse-mode="windowWidth > 768 ? 'width' : 'transform'"
    >
      <NMenu
        :options="options" :render-icon="renderIcon"
        :render-label="renderLabel" @update:value="handleUpdateValue"
      />
    </NLayoutSider>
    <NLayoutContent>
      <RouterView :class="route.meta.defaultPadding === true ? 'p-5' : ''" />
    </NLayoutContent>
  </NLayout>
</template>
