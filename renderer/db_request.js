import { TO_CURRENT_PAGE, FROM_CURRENT_PAGE } from './constants';

export const findOne = (contents) => {
  window.api.send(TO_CURRENT_PAGE, {
    name: 'local_db',
    collection: 'pages',
    type: 'findOne',
    contents,
  });
};

export const update = (contents) => {
  window.api.send(TO_CURRENT_PAGE, {
    name: 'local_db',
    collection: 'pages',
    type: 'update',
    contents,
  });
};

export const removeListener = (handler) => {
  window.api.removeListener(FROM_CURRENT_PAGE, handler);
};
