import { ADD_PAGE, CLOSE_PAGE } from './constants';

const findPageIndex = (pageList, foundPage) => (
  pageList.findIndex((page) => foundPage.routingPath === page.routingPath)
);

const removePageFromState = (pages, removedPage) => {
  const rmPageIndex = findPageIndex(pages, removedPage);
  pages.splice(rmPageIndex, 1);
  return [...pages];
};

const pageExist = (newPage, pageList) => (
  pageList.findIndex((page) => newPage.key === page.key)
);

export default (state, action) => {
  switch (action.type) {
    case ADD_PAGE:
      return pageExist(action.payload, state) !== -1 ? state : [...state, action.payload];
    case CLOSE_PAGE:
      return removePageFromState(state, action.payload);
    default:
      return state;
  }
};
