import { combineReducers } from 'redux';
import votingReducer from './votingReducer.js';

export default combineReducers({
  voting: votingReducer
});