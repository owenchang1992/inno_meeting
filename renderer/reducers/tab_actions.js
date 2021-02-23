import CryptoJS from 'crypto-js';
import path from 'path';
import { ADD_PAGE, CLOSE_PAGE } from './constants';

const IMAGE = 'image';

export const pageCreater = (src, projectName) => ({
  key: `/${CryptoJS.SHA256(src).toString(CryptoJS.enc.Hex)}`,
  name: path.basename(src),
  src,
  type: IMAGE,
  project: projectName,
  actions: [],
});

export const addPage = (page) => ({
  type: ADD_PAGE,
  payload: page,
});

export const closeTab = (page) => ({
  type: CLOSE_PAGE,
  payload: page,
});
