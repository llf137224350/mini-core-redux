import { AnyAction } from 'redux';
import { ActionTypes } from './constants';

export interface DetailState {
  counter: number;
}

export const detailInitState: DetailState = {
  counter: 1
};

export const reducer = (state: DetailState = detailInitState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.DETAIL_ACTION_INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case ActionTypes.DETAIL_ACTION_DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case ActionTypes.DETAIL_ACTION_RESET:
      return detailInitState;
  }
  return state;
};
