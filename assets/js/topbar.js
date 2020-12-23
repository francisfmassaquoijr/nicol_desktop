const { remote } = require("electron");
const { BrowserWindow, Menu } = remote;
let print_win;
// Menu.setApplicationMenu(null);


function navigateTo(url) {
  document.querySelector("webview").src = url;
}

function getControlsHeight() {
  let controls = document.querySelector("#controls");
  if (controls) {
    return controls.offsetHeight;
  }
  return 0;
}

function homeButton() {
  document.querySelector("#home").onclick = () => {
    let attribute = document.getElementById("webview");
    let home = attribute.getAttribute("data-home");
    navigateTo(home);
  };
}


// let webview = document.getElementById('webview')


// function printButton() {
//   document.getElementById("print_button").addEventListener("click", print);
// }

// function print() {
//   let webview = document.querySelector("webview");
//   print_win = new BrowserWindow({ "auto-hide-menu-bar": true });
//   print_win.loadURL(webview.src);
//   print_win.webContents.on("did-finish-load", () => {
//     print_win.webContents.print();
//   });
// }


// online checker 

// const alertOnlineStatus = () => { 
//   window.alert(
    
//     navigator.onLine ? 'Welcome to NICOL Software': 
//   'Sorry, our database is hosted in the cloud you will need to be connected to an active internet connection to work with this system'
//   ) 
// }

// window.addEventListener('online', alertOnlineStatus)
// window.addEventListener('offline', alertOnlineStatus)

// alertOnlineStatus()
