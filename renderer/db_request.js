import { TO_CURRENT_PAGE } from './constants';

export const findOne = (contents) => {
  console.log(contents);
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
