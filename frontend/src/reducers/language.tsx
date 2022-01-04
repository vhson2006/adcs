import { languageAction } from '../actions/main';

const initialLanguage = {
  activedLanguage: localStorage.getItem('activedLanguage') ? localStorage.getItem('activedLanguage') : 'en',
};

const languageReducer = (state = initialLanguage, action: any) => {
  switch (action.type) {
    case languageAction.CHANGE_LANGUAGE:
      return { ...state, activedLanguage: action.value };
    default:
      return state;
  }
};

export default languageReducer;
