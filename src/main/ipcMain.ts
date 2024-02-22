import { ipcMain, MenuItemConstructorOptions, Menu, app } from 'electron'

ipcMain.on('app_quit', (_event, pageType) => {
  // 设置页鼠标右键不显示退出
  if (pageType === 'setting') return
  const template: MenuItemConstructorOptions[] = [
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  menu.popup()
})

ipcMain.on('ping', () => console.log('pong'))
