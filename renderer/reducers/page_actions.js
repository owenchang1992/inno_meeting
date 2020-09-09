import { ADD_PAGE, CLOSE_PAGE } from './constants';

export const addNewPage = (page) => ({
  type: ADD_PAGE,
  payload: page,
});

export const closePage = (page) => ({
  type: CLOSE_PAGE,
  payload: page,
});
