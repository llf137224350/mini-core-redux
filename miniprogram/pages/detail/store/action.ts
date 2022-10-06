import { ActionTypes } from './constants';

export class Action {
  /**
   * 数量+1
   */
  public static incrementAction() {
    return {
      type: ActionTypes.DETAIL_ACTION_INCREMENT
    };
  }

  /**
   * 数量-1
   */
  public static decrementAction() {
    return {
      type: ActionTypes.DETAIL_ACTION_DECREMENT
    };
  }

  /**
   * 重置状态
   */
  public static resetAction() {
    return {
      type: ActionTypes.DETAIL_ACTION_RESET
    };
  }
}
