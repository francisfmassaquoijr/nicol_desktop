const electron = require("electron");
const app = electron.app;
const { BrowserWindow } = electron;

const path = require("path");
const fs = require("fs");

// Menu (for standard keyboard shortcuts)
const { Menu } = require("electron");

const template = [
 // {
    // label: "Edit",
  //   submenu: [
  //     { role: "undo" },
  //     { role: "redo" },
  //     { type: "separator" },
  //     { role: "cut" },
  //     { role: "copy" },
  //     { role: "paste" },
  //     { role: "pasteandmatchstyle" },
  //     { role: "delete" },
  //     { role: "selectall" },
  //   ],
  // },
  //  {
  //    label: "view",
  //    submenu: [
  //     // { role: "Website" },
      // { role: "forcereload" },
      // { role: "toggledevtools" },
  //     // { type: "separator" },
  //     // { role: "resetzoom" },
  //     // { role: "zoomin" },
  //     // { role: "zoomout" },
  //     // { type: "separator" },
  //     // { role: "togglefullscreen" },
  //    ],
  //  },
  // {
  //   role: "window",
  //   submenu: [{ role: "minimize" }, { role: "close" }],
  // },
];

if (process.platform === "darwin") {
  template.unshift({
    label: app.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services", submenu: [] },
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" },
    ],
  });

  // Edit menu
  template[1].submenu.push(
    { type: "separator" },
    {
      label: "Speech",
      submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
    }
  );

  // Window menu
  template[3].submenu = [
    { role: "close" },
    { role: "minimize" },
    { role: "zoom" },
    { type: "separator" },
    { role: "front" },
  ];
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let initPath;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.allowRendererProcessReuse = true;
app.on("ready", () => {
  initPath = path.join(app.getPath("userData"), "init.json");

  try {
    data = JSON.parse(fs.readFileSync(initPath, "utf8"));
  } catch (e) {}

  // https://www.electronjs.org/docs/api/browser-window#class-browserwindow
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, "assets/icons/png/icon.png"),
    // titleBarStyle: 'hidden',
    // frame: false,
    backgroundColor: "#fff",

    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      // https://www.electronjs.org/docs/api/webview-tag
      webviewTag: true, // Security warning since Electron 10
      zoomFactor: 1.0,
      enableRemoteModule: true,
      plugins: true,
    },
  });

mainWindow.loadURL("file://" + __dirname + "/index.html");
//   mainWindow.loadURL(url.format({
//     pathname: filePath,
//     protocol: 'file:',
//     slashes: true
// }));


  // mainWindow.webContents.on('new-window', function(e, url) {
  //   e.preventDefault();
  //   require('electron').shell.openExternal('http://127.0.0.1:3232/sysadmin/individual/debit/note/view/');
  // });


  // Display Dev Tools
  //mainWindow.openDevTools();

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);




});



// Quit when all windows are closed.
app.on("window-all-closed", () => {
  data = {
    bounds: mainWindow.getBounds(),
  };
  fs.writeFileSync(initPath, JSON.stringify(data));
  app.quit();
});






// app.on('web-contents-created', (e, contents) => {
//   // Check for a webview
//   if (contents.getType() == 'webview') {
//     // Listen for any new window events
//     contents.on('new-window', (e, url) => {
//       e.preventDefault()
//       shell.openExternal(url)
//     })
//   }
// })

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};
