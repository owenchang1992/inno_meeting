import { TO_CURRENT_PAGE, FROM_CURRENT_PAGE } from './constants';

const DB_TYPE = 'local_db';
const FIND_ONE = 'findOne';
const UPDATE = 'update';

const send2LocalDB = (content) => {
  window.api.send(TO_CURRENT_PAGE, {
    dest: DB_TYPE,
    ...content,
  });
};

export const findOne = (contents) => {
  send2LocalDB({
    type: FIND_ONE,
    contents,
  });
};

export const update = (contents) => {
  send2LocalDB({
    type: UPDATE,
    contents,
  });
};

export const removeListener = (handler) => {
  window.api.removeListener(FROM_CURRENT_PAGE, handler);
};

export const receive = (handler) => {
  window.api.receive(FROM_CURRENT_PAGE, handler);
};
