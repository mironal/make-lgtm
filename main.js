var app = require('app');
var menubar = require('menubar');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

app.on('window-all-closed', function() {
  if(process.platform != 'darwin') {
    app.quit();
  }
});

var mb = menubar({
  width: 800,
  height: 600,
  icon: __dirname + '/menubar-icon.png',
  'always-on-top': true
});

app.dock.hide();

