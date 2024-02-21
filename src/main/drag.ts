import { BrowserWindow, ipcMain } from 'electron'

ipcMain.handle('drag', (event, opt: { x: number; y: number }) => {
  const win = BrowserWindow.fromWebContents(event.sender)!

  const [x, y] = win.getPosition()
  // 设置窗口位置
  win.setPosition(opt.x + x, opt.y + y)
})
