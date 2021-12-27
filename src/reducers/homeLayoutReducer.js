import {
  SET_TOGGLE_SIDEBAR_BTN_CHECKED,
  SET_TOGGLE_SETTING_MENU_BTN_CHECKED,
  SET_SHOW_TOGGLE_SIDEBAR,
  SET_IS_LOADING,
} from '../actions/homeLayoutActions';

export default (state, action) => {
  switch (action.type) {
    case SET_TOGGLE_SIDEBAR_BTN_CHECKED:
      return {
        ...state,
        toggleSidebarBtnChecked: action.payload,
      };
    case SET_TOGGLE_SETTING_MENU_BTN_CHECKED:
      return {
        ...state,
        toggleSettingMenuBtnChecked: action.payload,
      };
    case SET_SHOW_TOGGLE_SIDEBAR:
      return {
        ...state,
        showToggleSidebar: action.payload,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      throw new Error('invalid action');
  }
};
