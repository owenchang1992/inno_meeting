import { ADD_LABEL, CLOSE_LABEL } from './constants';

export default (state, action) => {
  switch (action.type) {
    case ADD_LABEL:
      return state;
    case CLOSE_LABEL:
      return state;
    default:
      return state;
  }
};
