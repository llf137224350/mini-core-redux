import { App, deepClone, GlobalData, isEqual } from 'mini-core';
import { RootState, store } from './store/index';

@App
export default class Application {
  @GlobalData
  public store = store;

  public subscribe<T, S extends object>(self: T, dataKey: keyof T, reducerKey: keyof RootState) {
    //  赋值
    self[dataKey] = this.store.getState()[reducerKey] as any;
    // 订阅值的更改
    this.store.subscribe(() => {
      const state = this.store.getState();
      const reducer = state[reducerKey] as S;
      const keys = Reflect.ownKeys(reducer);
      for (const key of keys) {
        const tempKey = key as keyof S;
        const obj = self[dataKey] as S;
        // 递归深度比较值（非地址值）判断值是否做了更改，如果做了更改，则同步更新到data
        if (!isEqual(obj[tempKey], reducer[tempKey])) {
          const thisReducer = deepClone(obj);
          thisReducer[tempKey] = reducer[tempKey];
          self[dataKey] = thisReducer as any;
        }
      }
    });
  }
}
