const Datastore = require('nedb');
const path = require('path');
const { app } = require('electron');

const db = new Datastore({
  filename: path.join(app.getPath('appData'), 'media_tagger/db', 'media.db'),
  autoload: true,
})

module.exports = (() => {
  const insert = ({contents}) => {
    return new Promise((resolve, reject) => {
      db.insert(contents, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      })
    })
  }

  const update = (props) => {
    return new Promise((resolve, reject) => {
      db.update({path: props.contents.path}, props.contents, {}, (err, numReplace) => {
        if (err) reject(err);
        resolve(numReplace);
      })
    })
      .then((resp) => {
        if (resp === 0) return insert(props);
        return resp;
      })
  }

  const findOne = (props) => {
    return new Promise((resolve, reject) => {
      db.findOne(props.contents, (err, doc) => {
        if(err) reject(err);
        resolve(doc);
      })
    })
  }

  return {
    insert,
    findOne,
    update,
  }
})()