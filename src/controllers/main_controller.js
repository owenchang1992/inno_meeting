module.exports = ({win, props}) => {
  const sendResponse = (msg) => {
    console.log('msg', msg);
    win.webContents.send('fromCurrentPage', msg)
  }

  switch(props.name) {
    case 'local_db':
      require('../models/nedb')[props.type](props)
        .then((resp) => sendResponse({
          ...props,
          contents: resp
        }))
        .catch((err) => { console.log(err) })
      break;
  }
};