import { combineReducers } from 'redux';
import { reducer as indexReducer } from '../pages/index/store/index';
import { reducer as detailReducer } from '../pages/detail/store/index';
// 组合多个reducer
export const reducer = combineReducers({
  indexReducer,
  detailReducer
});
