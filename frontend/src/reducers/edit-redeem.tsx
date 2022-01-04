import { editRedeemAction } from '../actions/main';

const initialEditRedeemModal = {
  modalFlag: false,
  redeem: {}
};

const editRedeemReducer = (state = initialEditRedeemModal, action: any) => {
  switch (action.type) {
    case editRedeemAction.OPEN_MODAL:
      return { ...state, modalFlag: true, redeem: action.value };
    case editRedeemAction.CLOSE_MODAL:
      return { ...state, modalFlag: false, redeem: {} };
    default:
      return state;
  }
};

export default editRedeemReducer;
