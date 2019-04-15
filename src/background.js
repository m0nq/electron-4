'use strict'

import { app, protocol, BrowserWindow, Menu } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true })
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600, icon: "icon.png" })
  win.maximize();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

const menuTemplate = [
  {
   label: "BinaryVille Shop",
   submenu: [
     {role: "close"},
     { 
       label: "Visit my site",
       click() {
         require('electron').shell.openExternal('https://7ty.tech/');
       }
     },
     { 
       label: "Quit",
      role: "quit"
     },
   ]
  },
  {
    label: "Edit",
    submenu: [
     {role: "undo"},
     {role: "redo"},
     {role: "cut"},
     {role: "copy"},
     {role: "paste"},
     {role: "selectall"}
   ]
  },
  {
    label: "View",
    submenu: [
     {role: "resetzoom"},
     {role: "zoomin"},
     {role: "zoomout"},
     {type: "separator"},
     {role: "togglefullscreen"}
    ]
  },{
    label: "Shop",
    submenu: [
      {
        label: "Shop",
        accelerator: process.platform === 'darwin' ? "Command+shift+I" : "Ctrl+shift+I",
        click(item) {
          win.webContents.send("shop");
        }
      },
      {
        label: "Checkout",
        accelerator: process.platform === 'darwin' ? "Command+shift+U" : "Ctrl+shift+U",
        click(item) {
          win.webContents.send("checkout");
        }
      }
      ]
  }   
];

const myAppMenu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(myAppMenu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
