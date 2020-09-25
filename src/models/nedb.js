const Datastore = require('nedb');
const path = require('path');
const { app } = require('electron');

const db = new Datastore({
  filename: path.join(app.getPath('appData'), 'media_tagger/db', 'media.db'),
  autoload: true,
})

module.exports = (() => {
  const insert = (props) => {
    return new Promise((resolve, reject) => {
      db.insert(props, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      })
    })
  }

  const update = (query) => {
    console.log('update');
    return new Promise((resolve, reject) => {
      db.update({path: query.path}, query, {}, (err, numReplace) => {
        if (err) reject(err);
        resolve(numReplace);
      })
    })
      .then((resp) => {
        if (resp === 0) return insert(query);
        return resp;
      })
  }

  const findOne = (query) => {
    return new Promise((resolve, reject) => {
      db.findOne(query, (err, doc) => {
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