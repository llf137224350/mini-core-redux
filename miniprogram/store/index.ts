import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import { isEqual } from 'mini-core';
import { reducer } from './reducer';
import Config from '../util/config';

export type MapStateToDataResult<T> = {
  [key in keyof T]?: T[key] | { value: T[key]; observer: (currentValue: T[key], oldValue: T[key]) => void };
};

/**
 * 初始化store
 * @param debug
 */
export const initStore = (debug: boolean) => {
  return debug ? createStore(reducer, applyMiddleware(logger, thunk)) : createStore(reducer, applyMiddleware(thunk));
};
// 根据是否测试环境决定是否打印日志
export const store = initStore(Config.TEST);
/**
 * 订阅state - 核心代码，慎动
 * @param thisArg 页面逻辑this
 * @param mapStateToData 页面data中属性和state中属性对应关系
 */
export const subscribe = <T extends object>(thisArg: T, mapStateToData: (state: RootState) => MapStateToDataResult<T>) => {
  // 处理映射
  const handle = (flag: boolean = true) => {
    const state = store.getState();
    const result = mapStateToData.call(thisArg, state);
    const keys = Reflect.ownKeys(result);
    for (let key of keys) {
      const tempKey = key as keyof T;
      const obj = result[tempKey] as any; // 有可能是普通对象或者数组也有可能是{value: xx, observer: fun}
      //  进行值比较，如果不等，则赋值
      if (typeof obj === 'object' && obj.observer && typeof obj.observer === 'function') {
        if (!isEqual(thisArg[tempKey], obj.value)) {
          flag && obj.observer.call(thisArg, thisArg[tempKey], obj.value);
          thisArg[tempKey] = obj.value;
        }
      } else if (!isEqual(thisArg[tempKey], obj)) {
        thisArg[tempKey] = result[tempKey] as any;
      }
    }
  };
  // 将state中初始值赋值给data
  handle(false);
  // 处理移除订阅
  const unSubscribe = store.subscribe(handle);
  // @ts-ignore
  const oldOnUnload = thisArg.onUnload;
  // @ts-ignore
  thisArg['onUnload'] = function () {
    oldOnUnload.call(thisArg);
    unSubscribe();
  };
};

export type RootState = ReturnType<typeof store.getState>;
export type GetState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
