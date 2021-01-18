import CryptoJS from 'crypto-js';
import { ADD_PAGE, CLOSE_TAB } from './constants';

const IMAGE = 'image';

export const pageCreater = (src, projectName) => ({
  key: `/${CryptoJS.SHA256(src).toString(CryptoJS.enc.Hex)}`,
  src,
  type: IMAGE,
  project: projectName,
  actions: [],
  // bucket: selectLabel.key,
});

export const addNewPage = (page) => ({
  type: ADD_PAGE,
  payload: page,
});

export const closeTab = (tab) => ({
  type: CLOSE_TAB,
  payload: tab,
});
