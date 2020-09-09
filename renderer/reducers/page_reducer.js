import { ADD_PAGE, CLOSE_PAGE, UPDATE_PAGE_PROPERTIES } from './constants';

const findPageIndex = (pageList, foundPage) => (
  pageList.findIndex((page) => foundPage.routingPath === page.routingPath)
);

const removePageFromState = (pages, removedPage) => {
  const rmPageIndex = findPageIndex(pages, removedPage);
  pages.splice(rmPageIndex, 1);
  return [...pages];
};

export default function (state, action) {
  switch (action.type) {
    case ADD_PAGE:
      return [...state, action.payload];
    case CLOSE_PAGE:
      return removePageFromState(state, action.payload);
    case UPDATE_PAGE_PROPERTIES:
      return state;
    default:
      return state;
  }
}
