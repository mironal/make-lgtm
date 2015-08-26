'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var Tray = require('tray');
var Menu = require('menu');

require('crash-reporter').start();

var window = null;

app.on('ready', function() {
  var menubarIcon = new Tray(__dirname + '/img/menubar-icon.png');

  function createWindowIfNeeded() {
    if (window) {
      return;
    }
    window = new BrowserWindow({
      x: 0,
      y: 0,
      width:800,
      height: 600,
      show: false,
      'always-on-top': true
    });
    window.loadUrl('file://' + __dirname + '/index.html');
    window.on('close', function(e) {
      window = null;
    });
  }

  // 初回の表示を早くするために読み込んでおく
  createWindowIfNeeded();

  // context menu

  var contextMenu = Menu.buildFromTemplate([
    // 動的にメニューを書き換えたいけどタイミングが無い...
    {label: 'Make LGTM! or Hide', click: function(){

      createWindowIfNeeded();

      if (window && window.isVisible()) {
        window.hide();

      } else {
        window.show();
      }
    }},
    {type: "separator"},
    {label: 'Quit', click: function() {
      app.quit();
    }}
  ]);

  menubarIcon.setContextMenu(contextMenu);
});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.dock.hide();

