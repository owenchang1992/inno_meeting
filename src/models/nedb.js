const os = require('os');
const Datastore = require('nedb');
const path = require('path');
const { app } = require('electron');

const db = new Datastore({
  filename: path.join(app.getPath('appData'), 'media_tagger/db', 'media.db'),
  autoload: true,
})

module.exports = (() => {
  const post = (props) => {
    return new Promise((resolve, reject) => {
      db.insert(JSON.parse(props), (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      })
    })
  }
    })
  }

  return {
    post,
  }
})()