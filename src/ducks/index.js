import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import network from './network';
import followers from './followers';

export default combineReducers({ auth, users, network, followers });
