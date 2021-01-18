import { ADD_PAGE, CLOSE_TAB } from './constants';

const findTabIndex = (tabList, foundTab) => (
  tabList.findIndex((tab) => foundTab.routingPath === tab.routingPath)
);

const removeTabFromState = (tabs, removedTab) => {
  const rmTabIndex = findTabIndex(tabs, removedTab);
  tabs.splice(rmTabIndex, 1);
  return [...tabs];
};

// const tabExist = (newTab, tabList) => (
//   tabList.findIndex((tab) => newTab.routingPath === tab.routingPath)
// );

// tabExist(action.payload, state) !== -1 ? state : [...state, action.payload];
export default (state, action) => {
  switch (action.type) {
    case ADD_PAGE:
      console.log([...state, ...action.payload]);
      return [...state, ...action.payload];
    case CLOSE_TAB:
      return removeTabFromState(state, action.payload);
    default:
      return state;
  }
};
