import { ADD_PAGE, CLOSE_PAGE } from './constants';

const removePageFromState = (pages, removedPage) => {
  const rmPageIndex = pages.findIndex(
    (page) => removedPage.routingPath === page.routingPath,
  );
  pages.splice(rmPageIndex, 1);
  return [...pages];
};

export const pageReducer = function (state, action) {
  switch (action.type) {
    case ADD_PAGE:
      return [...state, action.payload];
    case CLOSE_PAGE:
      return removePageFromState(state, action.payload);
    default:
      return state;
  }
};

export const otherReducer = function (state, action) {
  switch (action.type) {
    case 'add_other':
      return [...state, action.payload];
    default:
      return state;
  }
};
