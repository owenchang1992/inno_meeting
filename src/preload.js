const {
    contextBridge,
    ipcRenderer
} = require("electron");

const nodeTools = require('./utils')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain", "toCurrentPage"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain", "fromCurrentPage"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                ipcRenderer.on(channel, func);
            }
        },
        removeListener: (channel, func) => {
            console.log(channel, ipcRenderer.rawListeners(channel));
            ipcRenderer.removeAllListeners(channel, func);
            console.log('Hi', channel, ipcRenderer.rawListeners(channel));
        },
        getHomeDir: nodeTools.getHomeDir
    }
);