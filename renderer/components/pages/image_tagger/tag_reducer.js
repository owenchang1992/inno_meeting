import {
  DRAW_RECTANGLE,
  GET_TAGS_FROM_DB,
  DELETE_TAG,
  ADD_TAG,
} from './constant';

import { removeFromList } from './utils';

export default (state, [type, payload]) => {
  switch (type) {
    case DRAW_RECTANGLE:
      return [...state, {
        type,
        properties: payload,
      }];
    case GET_TAGS_FROM_DB:
      return payload;
    case DELETE_TAG:
      return removeFromList(payload, state);
    case ADD_TAG:
      return [...state, payload];
    default:
      return state;
  }
};
