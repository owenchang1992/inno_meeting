import { ADD_TAB, CLOSE_TAB } from './constants';

export const addNewTab = (tab) => ({
  type: ADD_TAB,
  payload: tab,
});

export const closeTab = (tab) => ({
  type: CLOSE_TAB,
  payload: tab,
});
