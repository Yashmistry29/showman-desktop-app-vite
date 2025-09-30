import { BrowserWindow, shell, Menu } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isMac = process.platform === 'darwin';

let mainWindow;
let childWindow;
let HomePageWindow;

const MenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Admin",
        accelerator: "CmdOrCtrl+D",
        click: () => {
          childWindow = new BrowserWindow({
            height: 500,
            width: 800,
            parent: mainWindow,
            show: false,
            maximizable: false,
            webPreferences: { nodeIntegration: true, contextIsolation: false }
          });
          childWindow.setMenu(null);
          isDev
            ? childWindow.loadURL('http://localhost:5173/#/signup')
            : childWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: '/signup' });
          childWindow.show();
        }
      },
      { type: 'separator' },
      {
        label: "Backup/Restore",
        click: () => {
          childWindow = new BrowserWindow({
            height: 200,
            width: 400,
            parent: mainWindow,
            show: false,
            maximizable: false,
            webPreferences: { nodeIntegration: true, contextIsolation: false }
          });
          childWindow.setMenu(null);
          isDev
            ? childWindow.loadURL('http://localhost:5173/#/backupandrestore')
            : childWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: '/backupandrestore' });
          childWindow.show();
        }
      },
      { label: "Reset Password" },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: "Edit",
    submenu: [
      {
        label: "Create/Update Customer",
        accelerator: "CmdOrCtrl+U",
        click: () => {
          childWindow = new BrowserWindow({
            height: 580,
            width: 800,
            parent: mainWindow,
            show: false,
            maximizable: false,
            webPreferences: { nodeIntegration: true, contextIsolation: false }
          });
          childWindow.setMenu(null);
          isDev
            ? childWindow.loadURL('http://localhost:5173/#/customer')
            : childWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: '/customer' });
          childWindow.show();
        }
      },
      {
        label: "Create/Update Job",
        accelerator: "CmdOrCtrl+J",
        click: () => {
          childWindow = new BrowserWindow({
            parent: mainWindow,
            show: false,
            webPreferences: { nodeIntegration: true, contextIsolation: false }
          });
          childWindow.setMenu(null);
          isDev
            ? childWindow.loadURL('http://localhost:5173/#/measurement')
            : childWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: '/measurement' });
          childWindow.maximize();
          childWindow.show();
        }
      },
      {
        label: "Create/Update Employee",
        accelerator: "CmdOrCtrl+E",
        click: () => {
          childWindow = new BrowserWindow({ height: 650, width: 800, parent: mainWindow, show: false, maximizable: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });
          childWindow.setMenu(null);
          isDev ?
            childWindow.loadURL('http://localhost:5173/#/employee') :
            childWindow.loadFile(`${path.join(__dirname, '../dist/index.html')}`, { hash: '/employee' });
          childWindow.show();
        }
      },
      { type: 'separator' },
      {
        label: "Change Price",
        accelerator: "CmdOrCtrl+M",
        click: () => {
          childWindow = new BrowserWindow({
            height: 500,
            width: 400,
            parent: mainWindow,
            maximizable: false,
            show: false,
            webPreferences: { nodeIntegration: true, contextIsolation: false }
          });
          childWindow.setMenu(null);
          isDev
            ? childWindow.loadURL('http://localhost:5173/#/price/')
            : childWindow.loadFile(path.join(__dirname, '../dist/index.html'), { hash: '/price' });
          childWindow.show();
        }
      },
      { type: 'separator' },
      { label: "Salary", accelerator: "CmdOrCtrl+T", enabled: false },
      { label: "Payment", accelerator: "CmdOrCtrl+I", enabled: false }
    ]
  },
  {
    label: "Help",
    submenu: [
      { label: "Toggle Developer Tools", role: 'toggleDevTools' },
      { role: 'reload' },
      { type: 'separator' },
      {
        label: 'Electron Documentation',
        click: async () => {
          await shell.openExternal('https://www.electronjs.org/docs/latest');
        }
      },
      { type: 'separator' },
      { label: "ChangeTheme", accelerator: "CmdOrCtrl+T" },
      { label: "Check for Updates" },
      {
        label: "About",
        click: async () => {
          await shell.openExternal('https://electronjs.org');
        }
      }
    ]
  }
];

const printMenuTemplate = [
  {
    label: "Developer Tools",
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { label: "Toggle Developer Tools", role: 'toggleDevTools' }
    ]
  }
];

const menu = Menu.buildFromTemplate(MenuTemplate);
const printMenu = Menu.buildFromTemplate(printMenuTemplate);

export {
  menu,
  printMenu,
  mainWindow,
  childWindow,
  HomePageWindow
};
