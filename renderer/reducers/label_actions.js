import CryptoJS from 'crypto-js';
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

const createTaggingLabel = (label) => ({
  key: `${CryptoJS.SHA256(label.title).toString(CryptoJS.enc.Hex)}`,
  type: 'tagging',
  required: false,
  unique: false,
  ...label,
});

const createBucketLabel = (label) => ({
  key: `${CryptoJS.SHA256(label.title).toString(CryptoJS.enc.Hex)}`,
  type: 'bucket',
  required: true,
  unique: true,
  ...label,
});

export const addNewTaggingLabel = (label) => ({
  type: ADD_NEW_LABEL,
  payload: Array.isArray(label)
    ? label.map((labelItem) => createTaggingLabel(labelItem))
    : createTaggingLabel(label),
});

export const addNewBucketLabel = (label) => ({
  type: ADD_NEW_LABEL,
  payload: Array.isArray(label)
    ? label.map((labelItem) => createBucketLabel(labelItem))
    : createBucketLabel(label),
});
