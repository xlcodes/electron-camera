<template>
  <main
    v-loading="devicesData.steamIsLoading"
    element-loading-text="数据流加载ing..."
    class="w-screen h-screen flex overflow-hidden"
    :class="{ 'rounded-full': devicesData.round }"
    :style="cameraStyle"
  >
    <video
      v-if="devicesData.pageType === PageTypeEnum.CAMERA"
      id="videoEl"
      ref="videoRef"
      class="object-cover h-full"
      :class="{ 'rounded-full': devicesData.round }"
    ></video>
  </main>
</template>

<script setup lang="ts">
// 获取当前设备的媒体输入和输出设备列表
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import useDevicesStore from '../stores/useDevicesStore'
import { PageTypeEnum } from '../common/enum'
import { storeToRefs } from 'pinia'

const videoRef = ref<HTMLVideoElement>()
const devicesStore = useDevicesStore()
const { getCameraSteam, destroyCameraStream } = useDevicesStore()
const { devicesData } = storeToRefs(devicesStore)

const cameraStyle = computed(() => {
  return `border: solid ${devicesData.value.borderWidth}px ${devicesData.value.borderColor};`
})

onMounted(() => {
  getCameraSteam(videoRef.value!)
})

onBeforeUnmount(() => {
  destroyCameraStream(videoRef.value!)
})
</script>
