import { UPDATE_LABEL, ADD_NEW_LABEL, INITIALIZE_LABEL } from './constants';

export const initializeLabel = (labels) => ({
  type: INITIALIZE_LABEL,
  payload: labels,
});

export const updateLabel = (label, contents) => ({
  type: UPDATE_LABEL,
  payload: {
    ...label,
    ...contents,
  },
});

export const addNewlabel = (label) => ({
  type: ADD_NEW_LABEL,
  payload: label,
});
