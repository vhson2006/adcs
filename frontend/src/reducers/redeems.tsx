import { redeemAction } from '../actions/main';
import { FIRST_PAGE, PAGE_SIZE } from '../commons/config';

export const redeemiInitial = {
  search: '',
  page: FIRST_PAGE,
  size: PAGE_SIZE,
  totalPage: 1,
  totalRedeem: 0,
  data: [],
};

const redeemReducer = (state = redeemiInitial, action: any) => {
  switch (action.type) {
    case redeemAction.GET_REDEEMS:
      return { ...state, ...action.value };
    case redeemAction.UPDATE_REDEEM:
      const redeem = action.value;
      const editedRedeems = state.data.map((element: any) => {
        if (element.id === redeem.id) {
          return redeem;
        }
        return element;
      });

      return { ...state, data: editedRedeems };
    case redeemAction.REMOVE_REDEEM:
      const { id } = action.value;
      const deletedRedeems = state.data.filter((element: any) => element.id != id);

      return { 
        ...state, 
        data: deletedRedeems,
        totalRedeem: state.totalRedeem - 1,
        totalPage: Math.ceil((state.totalRedeem - 1) / state.size),
        page: state.page > Math.ceil((state.totalRedeem - 1) / state.size) 
          ? Math.ceil((state.totalRedeem - 1) / state.size) 
          : state.page
      };
    default:
      return state;
  }
};

export default redeemReducer;
