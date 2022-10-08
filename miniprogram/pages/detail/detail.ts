import { Data, Page, showToast } from 'mini-core';
import { Action as IndexActions, UserInfo } from '../index/store/index';
import { Action } from './store/index';
import { MapStateToDataResult, RootState, store, subscribe } from '../../store/index';

/*
 * @Author: い 狂奔的蜗牛
 * @Date: 2022-10-06 11:24:01
 * @Description:  测试同步
 */
@Page
export default class Detail {
  @Data
  public counter: number;
  @Data
  public userInfo: UserInfo;

  public onLoad() {
    store.dispatch(Action.resetAction());
    subscribe(this, this.mapStateToData);
  }

  public mapStateToData(state: RootState): MapStateToDataResult<Detail> {
    return {
      counter: state.detailReducer.counter,
      userInfo: state.indexReducer.userInfo
    };
  }

  public increment() {
    store.dispatch(Action.incrementAction());
  }

  public decrement() {
    store.dispatch(Action.decrementAction());
  }

  public handleClick() {
    store.dispatch(
      IndexActions.updateUserInfoAction({
        hobbies: [...this.userInfo.hobbies!, '吃饭']
      })
    );
    showToast('更改成功');
  }

  public onUnload() {
    console.log('执行原有onUnload');
  }
}
