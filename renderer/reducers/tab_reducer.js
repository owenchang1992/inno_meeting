import { ADD_TAB, CLOSE_TAB } from './constants';

const findTabIndex = (tabList, foundTab) => (
  tabList.findIndex((tab) => foundTab.routingPath === tab.routingPath)
);

const removeTabFromState = (tabs, removedTab) => {
  const rmTabIndex = findTabIndex(tabs, removedTab);
  tabs.splice(rmTabIndex, 1);
  return [...tabs];
};

export default (state, action) => {
  switch (action.type) {
    case ADD_TAB:
      return [...state, action.payload];
    case CLOSE_TAB:
      return removeTabFromState(state, action.payload);
    default:
      return state;
  }
};
