<script setup lang="ts">
import { onMounted } from 'vue'
import useDevicesStore from './stores/useDevicesStore'
import { PageTypeEnum } from './common/enum'
import Camera from './components/Camera.vue'
import Setting from './components/Setting.vue'
import { storeToRefs } from 'pinia'
import useDrag from './lib/drag'
import CameraControl from './components/CameraControl.vue'
import PageTypeControl from './components/PageTypeControl.vue'

const { drag } = useDrag()
drag.run()

const { getDeviceList } = useDevicesStore()
const devicesStore = useDevicesStore()
const { devicesData } = storeToRefs(devicesStore)

const quit = () => {
  window.api!.quit(devicesData.value.pageType as PageTypeEnum)
}

onMounted(async () => {
  await getDeviceList()
})
</script>

<template>
  <Suspense>
    <main class="relative group" @contextmenu="quit">
      <PageTypeControl />
      <CameraControl />
      <section>
        <Setting v-if="devicesData.pageType === PageTypeEnum.SETTING" />
        <Camera v-else-if="devicesData.pageType === PageTypeEnum.CAMERA" />
      </section>
    </main>
  </Suspense>
</template>
