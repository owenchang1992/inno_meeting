const os = require('os');
const Datastore = require('nedb');
const path = require('path');
const { app } = require('electron');
// const fs = require('fs');

const db = new Datastore({
  filename: path.join(app.getPath('appData'), 'media_tagger/db', 'media.db'),
  autoload: true,
})

module.exports = (() => {
  const post = (props) => {
    db.insert(props, (err, newDoc) => {
      console.log(newDoc);
    })

    console.log('main model', props);
  }

  return {
    post,
  }
})()