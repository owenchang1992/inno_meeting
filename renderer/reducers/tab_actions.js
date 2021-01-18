import CryptoJS from 'crypto-js';
import path from 'path';
import { ADD_PAGE, CLOSE_TAB } from './constants';

const IMAGE = 'image';

export const pageCreater = (src, projectName) => ({
  key: `/${CryptoJS.SHA256(src).toString(CryptoJS.enc.Hex)}`,
  name: path.basename(src),
  src,
  type: IMAGE,
  project: projectName,
  actions: [],
});

export const addNewPage = (page) => ({
  type: ADD_PAGE,
  payload: page,
});

export const closeTab = (tab) => ({
  type: CLOSE_TAB,
  payload: tab,
});
