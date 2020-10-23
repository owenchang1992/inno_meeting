const { dialog } = require('electron');
const path = require('path');

const { FROM_MAIN } = require("../const");

module.exports = ({win, props}) => {
  const parsePaths = (filePaths) => {
    return filePaths.map((filePath) => ({
      fullPath: filePath,
      basePath: path.basename(filePath),
      routingPath: filePath.replace('C:', '').replace(/\\/g, '/'),
    }))
  };

  if (props === 'select-file-dialog') {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }
      ]
    })
      .then(resp => win.webContents.send(FROM_MAIN, {
        ...resp,
        name: 'from-select-file-dialog',
        filePaths: parsePaths(resp.filePaths)
      }))
      .catch((err) => console.log(err));
    }
}