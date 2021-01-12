import { UPDATE_LABELS } from './constants';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_LABELS:
      return action.payload;
    default:
      return state;
  }
};
