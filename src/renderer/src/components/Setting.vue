<template>
  <section class="bg-[#004d73] w-screen h-screen p-8 pt-10">
    <h2 class="text-gray-50 text-center text-sm mb-5 opacity-70">参数设置</h2>
    <el-select
      v-model="devicesData.id"
      class="mb-4"
      placeholder="请选择摄像头"
      clearable
      filterable
      @change="changeDevices"
    >
      <el-option
        v-for="camera in deviceList"
        :key="camera.deviceId"
        :label="camera.label"
        :value="camera.deviceId"
      />
    </el-select>
    <el-input-number
      v-model="devicesData.borderWidth"
      min="0"
      max="16"
      class="mb-4 w-full"
      placeholder="请输入摄像头边框"
    />
    <el-input v-model="devicesData.borderColor" class="mb-4" placeholder="请输入边框颜色" />
  </section>
</template>

<script setup lang="ts">
import useDevicesStore from '../stores/useDevicesStore'
import { storeToRefs } from 'pinia'
const { changeDevices } = useDevicesStore()
const devicesStore = useDevicesStore()
const { devicesData, deviceList } = storeToRefs(devicesStore)
</script>
