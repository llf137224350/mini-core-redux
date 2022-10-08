import { Data, go, Page } from 'mini-core';
import { Action, UserInfo } from './store/index';
import { MapStateToDataResult, RootState, store, subscribe } from '../../store/index';

@Page
export default class Index {
  @Data
  public counter: number = 0;
  @Data
  public userInfo: UserInfo;

  public onLoad() {
    subscribe(this, this.mapStateToData);
  }

  public mapStateToData(state: RootState): MapStateToDataResult<Index> {
    return {
      counter: state.indexReducer.counter,
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
    go(`/pages/detail/detail`);
  }

  public handleClickAsync() {
    // @ts-ignore
    store.dispatch(Action.updateUserInfoAsyncAction({ hobbies: [...this.userInfo.hobbies!, '吃饭'] }));
  }
}
