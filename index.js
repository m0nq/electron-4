const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  let browserWindow = new BrowserWindow({
    width: 600,
    height: 800,
    center: true,
    minWidth: 300,
    show: false
  });

  browserWindow.loadFile('./index.html');

  browserWindow.on('closed', () => {
    browserWindow = null;
  });

  let aboutWindow = new BrowserWindow({
    width: 300,
    height: 275,
    frame: false
  });

  aboutWindow.loadFile('./about.html');

  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
    aboutWindow.show();
  });

  aboutWindow.on('closed', () => {
    aboutWindow = null;
  });
};

app.on('ready', createWindow);
