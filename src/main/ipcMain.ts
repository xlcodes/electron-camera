import { ipcMain, MenuItemConstructorOptions, Menu, app } from 'electron'

ipcMain.on('app_quit', () => {
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
