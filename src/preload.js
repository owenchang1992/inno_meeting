const {
    contextBridge,
    ipcRenderer
} = require("electron");

const {
  TO_MAIN,
  FROM_MAIN,
  TO_CURRENT_PAGE,
  FROM_CURRENT_PAGE,
} = require("./const");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
    send: (channel, data) => {
      // whitelist channels
      let validChannels = [TO_MAIN, TO_CURRENT_PAGE];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      let validChannels = [FROM_MAIN, FROM_CURRENT_PAGE];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, func);
      }
    },
    removeListener: (channel, func) => {
      ipcRenderer.removeAllListeners(channel, func);
    }
  }
);