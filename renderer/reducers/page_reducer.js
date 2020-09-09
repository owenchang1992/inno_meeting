import { ADD_PAGE } from './constants';

export const pageReducer = function (state, action) {
  switch (action.type) {
    case ADD_PAGE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const otherReducer = function (state, action) {
  switch (action.type) {
    case 'add_other':
      return [...state, action.payload];
    default:
      return state;
  }
};
