const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  let appWindow = new BrowserWindow();
  appWindow.loadURL('https://7ty.tech');
};

app.on('ready', createWindow);
