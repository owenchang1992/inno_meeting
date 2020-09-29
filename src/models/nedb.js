module.exports = (() => {
  const insert = (db, props) => {
    return new Promise((resolve, reject) => {
      db.insert(props.contents, (err, newDoc) => {
        if (err) reject(err);
        resolve(newDoc);
      })
    })
  }

  const update = (db, props) => {
    return new Promise((resolve, reject) => {
      db.update({path: props.contents.path}, props.contents, {}, (err, numReplace) => {
        if (err) reject(err);
        resolve(numReplace);
      })
    })
      .then((resp) => {
        if (resp === 0) return insert(db, props);
        return resp;
      })
  }

  const findOne = (db, props) => {
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