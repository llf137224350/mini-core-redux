import { ActionTypes } from './constants';
import { UserInfo } from './reducer';
import { AppDispatch, GetState } from '../../../store';

export class Action {
  /**
   * 数量+1
   */
  public static incrementAction() {
    return {
      type: ActionTypes.INDEX_ACTION_INCREMENT
    };
  }

  /**
   * 数量-1
   */
  public static decrementAction() {
    return {
      type: ActionTypes.INDEX_ACTION_DECREMENT
    };
  }

  /**
   * 更新用户信息
   * @param payload
   */
  public static updateUserInfoAction = (payload: UserInfo) => {
    return {
      type: ActionTypes.INDEX_ACTION_UPDATE_USERINFO,
      payload
    };
  };
  /**
   * 模拟网络请求
   * @param payload
   */
  public static updateUserInfoAsyncAction = (payload: UserInfo) => {
    return function (dispatch: AppDispatch, getState: GetState) {
      console.log('2s后更新用户爱好');
      setTimeout(() => {
        dispatch({
          type: ActionTypes.INDEX_ACTION_UPDATE_USERINFO,
          payload
        });
      }, 2000);
    };
  };
}
