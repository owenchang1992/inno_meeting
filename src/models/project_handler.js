const {
  promises: fsPromises,
  constants: {
    COPYFILE_EXCL
  }
} = require('fs');

const path = require('path');

const copyFiles = (fileList, dest) => {
  return Promise.all(
    fileList.map((file) => (
      fsPromises.copyFile(file.src, path.join(dest, file.name), COPYFILE_EXCL)
    ))
  )
  .catch((err) => console.log('some thing error'))
}

const createFolder = (path) => {
  return fsPromises.mkdir(path, { recursive: true });
}

const writeFile = (file, data) => {
  return fsPromises.writeFile(file, data);
}

module.exports = {
  copyFiles,
  createFolder,
  writeFile
}
