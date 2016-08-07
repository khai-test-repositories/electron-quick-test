
'use strict'

var {app} = require('electron')

try {
    require('./lib/main.js')
} catch (error) {
    console.error(error.stack)
    console.error('QUIT.')
    app.quit()
}
