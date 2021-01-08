import { ADD_LABEL, CLOSE_LABEL } from './constants';

export const addNewLabel = (label) => ({
  type: ADD_LABEL,
  payload: label,
});

export const closeLabel = (label) => ({
  type: CLOSE_LABEL,
  payload: label,
});
