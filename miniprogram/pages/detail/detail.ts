import { Data, Page, showToast } from 'mini-core';
import Application from '../../app';
import { IndexState, Action as IndexActions } from '../index/store/index';
import { Action, DetailState } from './store/index';

/*
 * @Author: い 狂奔的蜗牛
 * @Date: 2022-10-06 11:24:01
 * @Description:  测试同步
 */
const app = getApp<Application>();
@Page
export default class Detail {
  @Data
  public indexState: IndexState;
  @Data
  public detailState: DetailState;

  public onLoad() {
    // 重置之前可能做的数据更改
    app.store.dispatch(Action.resetAction());
    // 订阅新的值
    app.subscribe<Detail, IndexState>(this, 'indexState', 'indexReducer');
    app.subscribe<Detail, DetailState>(this, 'detailState', 'detailReducer');
  }

  public increment() {
    app.store.dispatch(Action.incrementAction());
  }

  public decrement() {
    app.store.dispatch(Action.decrementAction());
  }

  public handleClick() {
    app.store.dispatch(
      IndexActions.updateUserInfoAction({
        hobbies: [...this.indexState.userInfo.hobbies!, '吃饭']
      })
    );
    showToast('更改成功');
  }
}
