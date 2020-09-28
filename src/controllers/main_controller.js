module.exports = ({win, props}) => {
  const sendResponse = (msg) => {
    console.log('msg', msg);
    win.webContents.send('fromCurrentPage', msg)
  }

  switch(props.name) {
    case 'local_db':
      require('../models/nedb')[props.type](props.contents)
        .then((resp) => sendResponse(resp))
        .catch((err) => { console.log(err) })
      break;
    // case 'app':
    //   if ( props.type === 'close') {
    //     console.log('app close')
    //     // win = null;
    //     // app.quit();
    //   }
    //   break;
  }
};