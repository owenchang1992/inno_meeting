import { TO_CURRENT_PAGE, FROM_CURRENT_PAGE } from './constants';

export const findOne = (collection, contents) => {
  window.api.send(TO_CURRENT_PAGE, {
    name: 'local_db',
    collection,
    type: 'findOne',
    contents,
  });
};

export const update = (collection, contents) => {
  window.api.send(TO_CURRENT_PAGE, {
    name: 'local_db',
    collection,
    type: 'update',
    contents,
  });
};

export const removeListener = (handler) => {
  window.api.removeListener(FROM_CURRENT_PAGE, handler);
};

export const receive = (handler) => {
  window.api.receive(FROM_CURRENT_PAGE, handler);
};
