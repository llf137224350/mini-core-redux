import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import { reducer } from './reducer';
import Config from '../util/config';

// 根据是否测试环境决定是否打印日志
export const store = Config.TEST ? createStore(reducer, applyMiddleware(logger, thunk)) : createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type GetState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
