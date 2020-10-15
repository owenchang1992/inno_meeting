import {
  GET_TAGS_FROM_DB,
  DELETE_TAG,
  ADD_TAG,
  HIDE_TAG,
  SHOW_TAG,
} from './constant';

import { removeFromList, hideTag, showTag } from './utils';

export default (state, [type, payload]) => {
  switch (type) {
    case GET_TAGS_FROM_DB:
      return payload;
    case DELETE_TAG:
      return removeFromList(payload, state);
    case ADD_TAG:
      return [...state, payload];
    case HIDE_TAG:
      return hideTag(payload, state);
    case SHOW_TAG:
      return showTag(payload, state);
    default:
      return state;
  }
};
