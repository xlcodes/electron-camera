import { defineStore } from 'pinia'
import { onMounted, onUnmounted, reactive, ref } from 'vue'

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

    const getCameraSteam = (el: HTMLVideoElement) => {
      const constraints: MediaStreamConstraints = {
        audio: false,
        video: {
          deviceId: devicesData!.id,
          width: 1920,
          height: 1080
        }
      }

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        el.srcObject = stream
        el.play()
      })
    }

    const destroyCameraStream = (el: HTMLVideoElement) => {
      const videoStream = el.srcObject
      el.pause()
      const tracks = (videoStream as MediaProvider).getTracks() // videoStream 替换成你获取到的视频流对象
      tracks.forEach((track) => track.stop())
    }

    const changeCameraRound = () => {
      devicesData.round = !devicesData.round
    }

    const deviceChangeEvent = (event) => {
      console.log(event)
    }

    onMounted(() => {
      window.addEventListener('devicechange', deviceChangeEvent)
    })

    onUnmounted(() => {
      window.removeEventListener('devicechange', deviceChangeEvent)
    })

    return {
      devicesData,
      deviceList,
      changePageType,
      changeDevices,
      getDeviceList,
      changeCameraRound,
      getCameraSteam,
      destroyCameraStream
    }
  },
  {
    persist: true
  }
)

export default useDevicesStore
