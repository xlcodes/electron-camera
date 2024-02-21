import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export enum PageTypeEnum {
  CAMERA = 'camera',
  SETTING = 'setting'
}

interface DevicesOpt {
  id: string // 选中设备ID
  pageType: PageTypeEnum // 当前页面类型
  borderWidth: number
  borderColor: string
  round: boolean // 是否为圆角
}

const useDevicesStore = defineStore(
  'cameras',
  () => {
    const deviceList = ref()

    const devicesData = reactive<DevicesOpt>({
      pageType: PageTypeEnum.SETTING,
      id: '',
      borderColor: '#ffffff',
      borderWidth: 0,
      round: true
    })

    const changePageType = (type: PageTypeEnum) => {
      devicesData.pageType = type
    }

    const changeDevices = (deviceId: string) => {
      devicesData.id = deviceId
    }

    const getDeviceList = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      deviceList.value = devices.filter((d) => d.kind.includes('video'))
    }

    const changeCameraRound = () => {
      devicesData.round = !devicesData.round
    }

    return {
      devicesData,
      deviceList,
      changePageType,
      changeDevices,
      getDeviceList,
      changeCameraRound
    }
  },
  {
    persist: true
  }
)

export default useDevicesStore
