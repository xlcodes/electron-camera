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
  steamIsLoading: boolean // 数据流加载状态
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
      round: true,
      steamIsLoading: false
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
      devicesData.steamIsLoading = true
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
          .catch((err) => {
            console.log('视频播放失败: ', err)
          })
          .finally(() => {
            devicesData.steamIsLoading = false
          })
      })
    }

    const cameraVideoPlay = () => {
      const videoEl: HTMLVideoElement = document.querySelector('#videoEl')!
      if (!videoEl.paused) return
      videoEl.play().catch((err) => {
        console.log('视频播放失败: ', err)
      })
    }
    const cameraVideoPause = () => {
      const videoEl: HTMLVideoElement = document.querySelector('#videoEl')!
      if (videoEl.paused) return
      videoEl.pause()
    }

    const destroyCameraStream = (el: HTMLVideoElement) => {
      const videoStream: MediaStream = el.srcObject as MediaStream
      el.pause()
      const tracks = videoStream.getTracks() // videoStream 替换成你获取到的视频流对象
      tracks.forEach((track) => track.stop())
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
      changeCameraRound,
      getCameraSteam,
      destroyCameraStream,
      cameraVideoPause,
      cameraVideoPlay
    }
  },
  {
    persist: true
  }
)

export default useDevicesStore
