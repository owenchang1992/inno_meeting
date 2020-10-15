import {
  DRAW_RECTANGLE,
  GET_TAGS_FROM_DB,
  DELETE_TAG,
} from './constant';

import { removeFromList } from './utils';

export default (state, [type, payload]) => {
  switch (type) {
    case DRAW_RECTANGLE:
      return [...state, {
        action: type,
        properties: payload,
      }];
    case GET_TAGS_FROM_DB:
      return payload;
    case DELETE_TAG:
      return removeFromList(payload, state);
    default:
      return state;
  }
};
