module.exports = (props) => {
  switch(props.name) {
    case 'local_db':
      require('../models/nedb')[props.type](props.contents);
      break;
  }
};