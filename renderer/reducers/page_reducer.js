import { ADD_PAGE } from './constants';

const initialState = [];

const pageReducer = function (state, action) {
  switch(action.type) {
    case ADD_PAGE:
      return [...state, action.paylaod];
    default: 
      return state;
  }
} 