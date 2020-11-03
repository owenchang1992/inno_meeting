import { TO_CURRENT_PAGE, FROM_CURRENT_PAGE } from './constants';

const FIND_ONE = 'findOne';
const UPDATE = 'update';

const send2LocalDB = (content) => {
  window.api.send(TO_CURRENT_PAGE, {
    ...content,
  });
};

export const findOne = (type, contents) => {
  send2LocalDB({
    type,
    name: FIND_ONE,
    contents,
  });
};

export const update = (type, contents) => {
  send2LocalDB({
    type,
    name: UPDATE,
    contents,
  });
};

export const removeListener = (handler) => {
  window.api.removeListener(FROM_CURRENT_PAGE, handler);
};

export const receive = (handler) => {
  window.api.receive(FROM_CURRENT_PAGE, handler);
};
