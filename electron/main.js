import electron from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import { exec } from 'child_process';
import { menu, printMenu, mainWindow, childWindow, HomePageWindow } from './component.js';


const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let localMainWindow;
let localChildWindow;
let localHomePageWindow;

const createWindow = () => {
  localChildWindow = new BrowserWindow({
    height: 500,
    width: 400,
    show: false,
    parent: localMainWindow,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  isDev
    ? localChildWindow.loadURL('http://localhost:5173/#/')
    : localChildWindow.loadFile(path.join(__dirname, '../dist/index.html'));

  localChildWindow.setMenu(null);
  localChildWindow.show();

  localChildWindow.on('closed', () => {
    localChildWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('quit', () => {
  localChildWindow = null;
  localMainWindow = null;
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on('Authenticated', (e, args) => {
  if (args) {
    localChildWindow?.close();

    localHomePageWindow = new BrowserWindow({
      height: 750,
      width: 850,
      maximizable: false,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    localHomePageWindow.setMenu(null);
    isDev
      ? localHomePageWindow.loadURL('http://localhost:5173/#/homepage')
      : localHomePageWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: '/homepage' });

    localHomePageWindow.show();

    localHomePageWindow.on('closed', () => {
      localHomePageWindow = null;
    });
  }
});

ipcMain.on('Timeout', (e, args) => {
  if (args) {
    localHomePageWindow?.close();

    localMainWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    localMainWindow.setMenu(menu);
    isDev
      ? localMainWindow.loadURL('http://localhost:5173/#/dashboard')
      : localMainWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: '/dashboard' });

    localMainWindow.maximize();
    localMainWindow.show();
  }
});

ipcMain.on('jobDetails', (e, data) => {
  localChildWindow = new BrowserWindow({
    parent: localMainWindow,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  localChildWindow.setMenu(printMenu);
  isDev
    ? localChildWindow.loadURL(`http://localhost:5173/#/print?job_id=${data.job_id}&c_id=${data.c_id}`)
    : localChildWindow.loadFile(path.join(__dirname, '../dist/index.html'), {
      hash: `/print?job_id=${data.job_id}&c_id=${data.c_id}`
    });

  localChildWindow.maximize();
  localChildWindow.show();
});

ipcMain.handle('Restore', () => {
  const restoreResult = dialog.showOpenDialogSync({
    title: 'Open File ...',
    filters: [
      { name: 'Zip Files', extensions: ['zip'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  });
  return restoreResult;
});
