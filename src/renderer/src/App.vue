<script setup lang="ts">
import {
  Picture,
  PictureRounded,
  Setting as SettingIcon,
  VideoCamera,
  VideoPlay,
  VideoPause
} from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import useDevicesStore, { PageTypeEnum } from './stores/useDevicesStore'
import Camera from './components/Camera.vue'
import Setting from './components/Setting.vue'
import { storeToRefs } from 'pinia'
import useDrag from './lib/drag'

const { drag } = useDrag()
drag.run()

const { changePageType, getDeviceList, changeCameraRound } = useDevicesStore()
const devicesStore = useDevicesStore()
const { cameraVideoPause, cameraVideoPlay } = useDevicesStore()
const { devicesData } = storeToRefs(devicesStore)

const quit = () => {
  window.api.quit()
}

onMounted(async () => {
  await getDeviceList()
})
</script>

<template>
  <Suspense>
    <main class="relative group" @contextmenu="quit">
      <section class="absolute w-screen justify-center p-2 z-10 hidden group-hover:flex">
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
      <section
        v-if="devicesData.pageType === PageTypeEnum.CAMERA"
        class="absolute left-1/2 -translate-x-1/2 mt-3 bottom-3 text-white opacity-80 cursor-pointer z-20 hidden group-hover:flex"
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
      <section>
        <Setting v-if="devicesData.pageType === PageTypeEnum.SETTING" />
        <Camera v-else-if="devicesData.pageType === PageTypeEnum.CAMERA" />
      </section>
    </main>
  </Suspense>
</template>
