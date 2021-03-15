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
          fsPromises.copyFile(
            src,
            path.join(dest, path.basename(src)),
            COPYFILE_EXCL
          )
        )))
      } else {
        return fsPromises.copyFile(
          source,
          path.join(dest, path.basename(source)),
          COPYFILE_EXCL
        )
      }
    })
    .catch((err) => console.log('some thing error', err))
}

const createFolder = (path) => fsPromises.mkdir(path, { recursive: true });

const writeFile = (file, data) => fsPromises.writeFile(file, data);

const syncMediaStore = (pageList, storePath) => fsPromises.readdir(storePath)
  .then((files) => {
    const bothHave = [];
    const shouldBeRemoved = [];
    const shouldBeCopied = [];

    const getIntersection = (pageList, files) => {
      pageList.forEach((page) => {
        if (files.findIndex((name) => name === page.name) !== -1) {
          bothHave.push(page.name);
        }
      })
    }

    const syncStore = (bothHave, files) => {
      files.forEach((fileName) => {
        if (bothHave.findIndex((name) => fileName === name) === -1) {
          shouldBeRemoved.push(fileName);
        } 
      });

      // console.log('shouldBeRemoved', shouldBeRemoved);
      shouldBeRemoved.forEach((fileName) => {
        if (fileName.indexOf('json') === -1) {
          fsPromises.unlink(path.join(storePath, fileName));
        }
      })
    }

    const saveToStore = (bothHave, pageList) => {
      pageList.map((page) => {
        if (bothHave.findIndex((name) => page.name === name) === -1) {
          shouldBeCopied.push(page);
        }
      });
      
      // console.log('shouldBeCopied', shouldBeCopied);
      copyFiles(shouldBeCopied.map((page) => page.src), storePath);
    }

    getIntersection(pageList, files);
    syncStore(bothHave, files);
    saveToStore(bothHave, pageList);
  })
  .catch((err) => console.log(err))

module.exports = {
  copyFiles,
  createFolder,
  writeFile,
  syncMediaStore,
  readdir: fsPromises.readdir
}
