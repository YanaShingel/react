import { call, put, takeEvery } from 'redux-saga/effects';
import { getTokenOwner, getUserInformation } from 'api';
import {
  fetchTokenOwnerRequest,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} from '../ducks/users';
import requestFlow from './request';
// import { networkError } from 'ducks/network';

function* fetchUserFlow(action) {
  try {
    let response;
    if (action.type === fetchTokenOwnerRequest.toString()) {
      response = yield call(requestFlow, getTokenOwner);
    }
    if (action.type === fetchUserRequest.toString()) {
      response = yield call(requestFlow, getUserInformation, action.payload);
    }
    yield put(fetchUserSuccess(response));
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

export function* fetchUserWatch() {
  yield takeEvery([fetchUserRequest, fetchTokenOwnerRequest], fetchUserFlow);
}
