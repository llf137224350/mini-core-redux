import { AnyAction } from 'redux';
import { ActionTypes } from './constants';

export interface UserInfo {
  name?: string;
  age?: number;
  hobbies?: string[];
}

export interface IndexState {
  counter: number;
  userInfo: UserInfo;
}

export const indexInitState: IndexState = {
  counter: 1,
  userInfo: { name: '狂奔的蜗牛', age: 18, hobbies: ['睡觉'] }
};

// 不能直接修改原有state，否则会导致有可能不刷新
export const reducer = (state: IndexState = indexInitState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.INDEX_ACTION_INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case ActionTypes.INDEX_ACTION_DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case ActionTypes.INDEX_ACTION_UPDATE_USERINFO:
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } };
  }
  return state;
};
