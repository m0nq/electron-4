const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  let win = new BrowserWindow({
    width: 600,
    height: 800,
    center: true,
    minWidth: 300,
    show: false
  });
  win.loadFile('./index.html');

  win.on('closed', () => {
    win = null;
  });

  win.once('ready-to-show', () => {
    win.show();
  });
};

app.on('ready', createWindow);
