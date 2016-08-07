
'use strict'

var {join: joinPath, dirname: parentDir} = require('path')
var electron = require('electron')
var {windows} = require('electron-utils')
var ObjectIterable = require('./object-iterable')

var {app, ipcMain} = electron

function ListObject(object, name, depth = 0) {
    console.log(`\n\x1B[32m${name}\x1B[0m`, object)
    depth && typeof object === 'object' && object &&
        new ObjectIterable(object).forEach(([pname, value]) => ListObject(value, name + '.' + pname, depth - 1))
}

app.on('ready', () => {
    ListObject(electron, 'electron', 1)
    console.log('electron.app.hide', electron.app.hide)
    windows.createWindow({}, joinPath(parentDir(__dirname), 'index.xml'))
})

app.on('window-all-closed', () => app.quit())

ipcMain.on('SuperMessage', (...args) => console.log('ipc message', ...args))
