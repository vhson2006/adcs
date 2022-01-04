import { takeEvery, put, call } from 'redux-saga/effects';
import { redeemAction } from '../actions/main';
import { common, PAGE_SIZE, FIRST_PAGE } from '../commons/config';
import { callPrivateJsonApi } from '../helpers/api';
import { redeemiInitial } from '../reducers/redeems';

export interface ResponseGenerator {
  data?:any,
  status?:number,
}
const reloadParam = { search: '', page: FIRST_PAGE, size: PAGE_SIZE };

function* getRedeemsAsync(dispatchInput: ReturnType<any>) {
  const { value } = dispatchInput;
  const response: ResponseGenerator = yield call(
    callPrivateJsonApi, 
    'GET',
    '/api/redeem',
    value
  );
  if (response.status === common.INCORRECT) {
    yield put({ type: redeemAction.GET_REDEEMS, value: redeemiInitial });
  } else {
    yield put({ type: redeemAction.GET_REDEEMS, value: response.data });
  }
}

export function* watchGetRedeemsAsync() {
  yield takeEvery(redeemAction.SAGA_GET_REDEEMS, getRedeemsAsync);
}

function* updateRedeemAsync(dispatchInput: ReturnType<any>) {
  const { value } = dispatchInput;
  const { id, created, redeemCode, ...redeem } = value;
  const response: ResponseGenerator = yield call(
    callPrivateJsonApi, 
    'PATCH',
    `/api/redeem/${id}`,
    redeem
  );
  if (response.status === common.INCORRECT) {
    yield put({ type: redeemAction.SAGA_GET_REDEEMS, value: reloadParam });
  } else {
    yield put({ type: redeemAction.UPDATE_REDEEM, value: value });
  }
}

export function* watchUpdateRedeemAsync() {
  yield takeEvery(redeemAction.SAGA_UPDATE_REDEEM, updateRedeemAsync);
}

function* deleteRedeemAsync(dispatchInput: ReturnType<any>) {
  const { value } = dispatchInput;
  const { id } = value;
  const response: ResponseGenerator = yield call(
    callPrivateJsonApi, 
    'DELETE',
    `/api/redeem/${id}`,
    {}
  );
  if (response.status === common.INCORRECT) {
    yield put({ type: redeemAction.SAGA_GET_REDEEMS, value: reloadParam });
  } else {
    yield put({ type: redeemAction.REMOVE_REDEEM, value: value });
  }
}

export function* watchDeleteRedeemAsync() {
  yield takeEvery(redeemAction.SAGA_REMOVE_REDEEM, deleteRedeemAsync);
}