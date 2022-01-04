import { combineReducers } from 'redux';
import editRedeemReducer from './edit-redeem';
import languageReducer from './language';
import redeemReducer from './redeems';

const RootReducer = combineReducers({
  language: languageReducer,
  redeem: redeemReducer,
  editRedeem: editRedeemReducer,
});

export default RootReducer;
