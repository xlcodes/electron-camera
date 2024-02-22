import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

enum PageTypeEnum {
  CAMERA = 'camera',
  SETTING = 'setting'
}

const api = {
  quit: (pageType: PageTypeEnum) => {
    ipcRenderer.send('app_quit', pageType)
  },
  drag: (opt: { x: number; y: number }) => {
    console.log('预加载脚本：', opt.x, opt.y)
    ipcRenderer.invoke('drag', opt)
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
