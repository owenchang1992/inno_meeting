const { app, BrowserWindow, ipcMain, screen } = require('electron');
const electronShortcut = require('electron-localshortcut');

const path = require('path');
const URL = require('url');
const isDev = require('electron-is-dev');

const main_controller = require('./controllers/main_controller');

/**
 * When in development mode:
 * - Enable automatic reloads
 */
if (isDev) {
  console.log(path.join(__dirname, '../', './node_modules/@electron'));
	require('electron-reload')(path.join(__dirname, '../'), {
    // Note that the path to electron may vary according to the main file
    electron: path.join(__dirname, '../', './node_modules/electron')
  });
}

function createWindow () {
  const { width, height } = screen.getPrimaryDisplay().rotation;
    // Path to root directory.
  const basePath = isDev ?  path.resolve(__dirname, '../') : app.getAppPath();
  
  // Create the browser window.
  let win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.resolve(basePath, './build/preload.js')
    },
	})

	// URL for index.html which will be our entry point.
	const indexURL = URL.format({
		pathname: path.resolve(basePath ,'./build/index.html'),
		protocol: 'file:',
		slashes: true
	});

  // and load the index.html of the app.
  win.loadURL(indexURL);

  win.on('close', (e) => {
    if (win) {
      // e.preventDefault();
      win.webContents.send('fromMain', 'app-close');
    }
  })

  // Open the DevTools.
  // win.webContents.openDevTools()

  ipcMain.on('toMain', (e, props) => {
    console.log('Hi', props);
    // if (props === 'close') {
    //   win = null;
    //   app.quit();
    // }
  })

  ipcMain.on('toCurrentPage', (e, props) => {
    main_controller({win, app, props})
    console.log(props);
  })

  // Register the shortcut for windows version
  electronShortcut.register(win, 'F12', () => {
    win.toggleDevTools();
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
