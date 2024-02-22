<template>
  <section
    v-if="devicesData.pageType === PageTypeEnum.CAMERA"
    class="absolute left-1/2 -translate-x-1/2 mt-3 bottom-5 text-white opacity-80 cursor-pointer z-20 hidden group-hover:flex"
  >
    <el-icon class="text-white opacity-80" size="24" @click="changeCameraRound()">
      <PictureRounded v-if="devicesData.round" />
      <Picture v-else-if="!devicesData.round" />
    </el-icon>
    <el-icon class="text-white opacity-80 ml-3" size="24" @click="cameraVideoPlay">
      <VideoPlay />
    </el-icon>
    <el-icon class="text-white opacity-80 ml-3" size="24" @click="cameraVideoPause">
      <VideoPause />
    </el-icon>
  </section>
</template>

<script setup lang="ts">
import useDevicesStore from '../stores/useDevicesStore'
import { PageTypeEnum } from '../common/enum'
import { storeToRefs } from 'pinia'
import { Picture, PictureRounded, VideoPlay, VideoPause } from '@element-plus/icons-vue'

const { changeCameraRound } = useDevicesStore()
const devicesStore = useDevicesStore()
const { cameraVideoPause, cameraVideoPlay } = useDevicesStore()
const { devicesData } = storeToRefs(devicesStore)
</script>
