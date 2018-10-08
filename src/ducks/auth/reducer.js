import { handleActions } from 'redux-actions';
import { authorize, logout } from './actions';
import { combineReducers } from 'redux';

const isAuthorized = handleActions(
  {
    [authorize.toString()]: () => {
      return true;
    },
    [logout.toString()]: () => false
  },
  false
);

export default combineReducers({ isAuthorized });
