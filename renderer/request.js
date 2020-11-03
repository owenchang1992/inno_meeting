import { TO_CURRENT_PAGE } from './constants';

const FIND_ONE = 'findOne';
const UPDATE = 'update';

export const send2LocalDB = (channel, content) => {
  window.api.send(channel, {
    ...content,
  });
};

export const findOne = (type, contents) => {
  send2LocalDB(
    TO_CURRENT_PAGE,
    {
      type,
      name: FIND_ONE,
      contents,
    },
  );
};

export const update = (type, contents) => {
  send2LocalDB(
    TO_CURRENT_PAGE,
    {
      type,
      name: UPDATE,
      contents,
    },
  );
};

export const removeListener = (channel, handler) => {
  window.api.removeListener(channel, handler);
};

export const receive = (channel, handler) => {
  window.api.receive(channel, handler);
};
