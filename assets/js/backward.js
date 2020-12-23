// selecting the backward button 
let backward = document.getElementById('backWard')
// let webview = document.getElementById('webview')

function navigateTo(url) {
    document.querySelector("webview").src = url;
  }

backward.addEventListener('click', (event) => {
    let webview = document.querySelector("webview")
    webview.goBack()
})

let webview = document.querySelector("webview")

webview.addEventListener('new-window', (e) => {
  const protocol = require('url').parse(e.url).protocol
  if (protocol === 'http:' || protocol === 'https:') {
    //shell.openExternal(e.url)
    let win = new BrowserWindow({width: 1200, height: 960})
    win.loadURL(e.url);
  }
})