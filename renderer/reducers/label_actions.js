import { UPDATE_LABELS, ADD_NEW_LABELS } from './constants';

export const updatelabels = (labels) => ({
  type: UPDATE_LABELS,
  payload: labels,
});

export const addNewlabel = (labels) => ({
  type: ADD_NEW_LABELS,
  payload: labels,
});
