import { Data, go, Page } from 'mini-core';
import Application from '../../app';
import { IndexState, Action } from './store/index';

const app = getApp<Application>();
@Page
export default class Index {
  @Data
  public state: IndexState;

  public onLoad() {
    app.subscribe<Index, IndexState>(this, 'state', 'indexReducer');
  }

  public increment() {
    app.store.dispatch(Action.incrementAction());
  }

  public decrement() {
    app.store.dispatch(Action.decrementAction());
  }

  public handleClick() {
    go(`/pages/detail/detail`);
  }

  public handleClickAsync() {
    // @ts-ignore
    app.store.dispatch(Action.updateUserInfoAsyncAction({ hobbies: [...this.state.userInfo.hobbies!, '吃饭'] }));
  }
}
