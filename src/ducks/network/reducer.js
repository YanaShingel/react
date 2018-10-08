import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { networkError, clearNetworkErrors } from './actions';

const error = handleActions(
  {
    [clearNetworkErrors.toString()]: () => false,
    [networkError.toString()]: (_state, action) => action.payload
  },
  false
);

const message = handleActions(
  {
    [networkError.toString()]: (_state, action) => {
      return action.payload.response.data.message;
    },

    [clearNetworkErrors.toString()]: () => null
  },
  null
);

export default combineReducers({ error, message });
