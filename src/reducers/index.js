import {combineReducers} from 'redux';
import { storeChildren } from './accordionStore';

const allReducers = combineReducers({
  storeChildren
});
export default allReducers;
