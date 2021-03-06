import { WORKING_FOLDER } from './constants';

const filterWorkingFolder = (pageList, workingFolder = '') => (
  pageList.filter((page) => page.src.indexOf(workingFolder) !== -1)
);

export default (filterName, list, options) => {
  switch (filterName) {
    case WORKING_FOLDER:
      return filterWorkingFolder(list, options);
    default:
      return list;
  }
};
