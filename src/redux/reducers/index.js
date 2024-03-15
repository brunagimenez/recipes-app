import { combineReducers } from 'redux';
import apiSearch from './apiSearch';

const recipesReducer = combineReducers({ apiSearch });

export default recipesReducer;
