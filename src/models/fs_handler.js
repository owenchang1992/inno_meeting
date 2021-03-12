const {
  promises: fsPromises,
  constants: {
    COPYFILE_EXCL
  }
} = require('fs');

const path = require('path');

const copyFiles = (source, dest) => {
  return createFolder(dest)
    .then(() => {
      if(Array.isArray(source)) {
        return Promise.all(source.map((src) => (
          fsPromises.copyFile(src, path.join(dest, path.basename(src)), COPYFILE_EXCL)
        )))
      } else {
        return fsPromises.copyFile(source, path.join(dest, path.basename(source)), COPYFILE_EXCL)
      }
    })
    .catch((err) => console.log('some thing error', err))
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
  writeFile,
}
