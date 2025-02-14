<script setup lang="ts">
import type { PlumeHomeConfigBase } from 'vuepress-theme-plume'
import { VPHomeBox } from 'vuepress-theme-plume/client'
import { useClientData, usePageData} from 'vuepress/client'
import { useLocalePostList } from 'vuepress-theme-plume/composables'


const props = defineProps<PlumeHomeConfigBase & {
  banner: string;
  bannerMask: number;
}>()

const postList = useClientData()
const pages = usePageData();
console.log(postList, pages, useLocalePostList());

const bannerMask = `rgba(0, 0, 0, ${props.bannerMask})`;
</script>

<template>
  <VPHomeBox
    :type="type"
    :background-image="banner"
    :background-attachment="backgroundAttachment"
    :full="full"
    :style="{ '--bannerMask': bannerMask }"
  >
    <template #before>
      <div class="mask"></div>
    </template>
    <div>...</div>
  </VPHomeBox>
</template>

<style lang="less" scoped>
.mask{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: var(--bannerMask);
}
</style>