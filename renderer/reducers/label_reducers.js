import { ADD_LABEL } from './constants';

export default (state, action) => {
  switch (action.type) {
    case ADD_LABEL:
      return [...state, action.payload];
    default:
      return state;
  }
};
