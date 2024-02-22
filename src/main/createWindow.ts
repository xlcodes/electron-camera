import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { BrowserWindow, shell } from 'electron'
import icon from '../../resources/icon.png?asset'

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 280,
    height: 280,
    minWidth: 240,
    minHeight: 240,
    maxHeight: 360,
    maxWidth: 360,
    x: 1350,
    y: 100,
    show: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  if (is.dev) {
    // 打开开发者工具
    mainWindow.webContents.openDevTools()
  }

  // 按 1:1 比例缩放
  mainWindow.setAspectRatio(1)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

export default createWindow
