import { WORKING_FOLDER } from './constants';

const filterWorkingPath = (pageList, workingPath = '') => (
  pageList.filter((page) => page.src.indexOf(workingPath) !== -1)
);

export default (filterName, list, options) => {
  switch (filterName) {
    case WORKING_FOLDER:
      return filterWorkingPath(list, options.workingPath);
    default:
      return list;
  }
};
