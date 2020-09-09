import { ADD_PAGE, CLOSE_PAGE, UPDATE_PAGE_PROPERTIES } from './constants';

export const addNewPage = (page) => ({
  type: ADD_PAGE,
  payload: page,
});

export const closePage = (page) => ({
  type: CLOSE_PAGE,
  payload: page,
});

export const updatePageProperties = (props) => ({
  type: UPDATE_PAGE_PROPERTIES,
  payload: props,
});
