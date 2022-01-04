import { all, fork } from 'redux-saga/effects';
import { watchGetRedeemsAsync, watchUpdateRedeemAsync, watchDeleteRedeemAsync } from './redeems';

export default function* saga() {
  yield all([
    fork(watchGetRedeemsAsync),
    fork(watchUpdateRedeemAsync),
    fork(watchDeleteRedeemAsync),
  ]);
}
