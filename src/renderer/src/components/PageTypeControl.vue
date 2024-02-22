<template>
  <section class="absolute w-screen justify-center mt-3 p-2 z-10 hidden group-hover:flex">
    <el-icon
      v-if="devicesData.pageType === PageTypeEnum.SETTING"
      class="text-white opacity-80"
      size="24"
      @click="changePageType(PageTypeEnum.CAMERA)"
    >
      <VideoCamera />
    </el-icon>
    <el-icon
      v-else-if="devicesData.pageType === PageTypeEnum.CAMERA"
      class="text-white opacity-80"
      size="24"
      @click="changePageType(PageTypeEnum.SETTING)"
    >
      <SettingIcon />
    </el-icon>
  </section>
</template>

<script setup lang="ts">
import { Setting as SettingIcon, VideoCamera } from '@element-plus/icons-vue'
import useDevicesStore from '../stores/useDevicesStore'
import { PageTypeEnum } from '../common/enum'
import { storeToRefs } from 'pinia'
const { changePageType } = useDevicesStore()
const devicesStore = useDevicesStore()
const { devicesData } = storeToRefs(devicesStore)
</script>
