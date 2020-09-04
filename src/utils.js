const os = require('os')

/**
 *  All the functions in this file should be a pure function
 */

module.exports = {
    getHomeDir: () => (os.homedir()),
}