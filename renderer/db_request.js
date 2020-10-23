import { TO_CURRENT_PAGE, FROM_CURRENT_PAGE } from './constants';

const DB_TYPE = 'local_db';
const FIND_ONE = 'findOne';
const UPDATE = 'update';

export const findOne = (collection, contents) => {
  window.api.send(TO_CURRENT_PAGE, {
    name: DB_TYPE,
    collection,
    type: FIND_ONE,
    contents,
  });
};

export const update = (collection, contents) => {
  window.api.send(TO_CURRENT_PAGE, {
    name: DB_TYPE,
    collection,
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
