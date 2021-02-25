import { ADD_PAGE, CLOSE_PAGE, UPDATE_PAGE } from './constants';

const findPageIndex = (targetPage, pageList) => (
  pageList.findIndex((page) => targetPage.key === page.key)
);

const removePageFromState = (pages, removedPage) => {
  const rmPageIndex = findPageIndex(removedPage, pages);
  pages.splice(rmPageIndex, 1);
  return [...pages];
};

const onAddPage = (state, action) => {
  if (findPageIndex(action.payload, state) !== -1) {
    return state;
  }
  return [...state, action.payload];
};

const onUpdate = (pages, updatedPage) => {
  const pageIndex = findPageIndex(updatedPage, pages);
  if (pageIndex !== -1) {
    pages.splice(pageIndex, 1, updatedPage);
  }
  return [...pages];
};

export default (state, action) => {
  switch (action.type) {
    case ADD_PAGE:
      return onAddPage(state, action);
    case UPDATE_PAGE:
      return onUpdate(state, action.payload);
    case CLOSE_PAGE:
      return removePageFromState(state, action.payload);
    default:
      return state;
  }
};
