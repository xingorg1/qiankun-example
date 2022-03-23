
/**
 * 
 * @param {vuex实例} store 
 * @param {qiankun下发的props} props 
 */
function registerGlobalModule (store, props = {}) {

  if (!store || !store.hasModule) {
    return;
  }

  // 获取初始化的state
  const initState = props.getGlobalState && props.getGlobalState() || {
    menu: [],
    user: {}
  };

  // 将父应用的数据存储到子应用中，命名空间固定为global
  if (!store.hasModule('global')) {
    const globalModule = {
      namespaced: true,
      state: initState,
      actions: {
        // 子应用改变state并通知父应用
        setGlobalState ({ commit }, payload) {
          commit('setGlobalState', payload);
          commit('emitGlobalState', payload);
        },
        // 初始化，只用于mount时同步父应用的数据
        initGlobalState ({ commit }, payload) {
          commit('setGlobalState', payload);
        },
      },
      mutations: {
        setGlobalState (state, payload) {
          // eslint-disable-next-line
          state = Object.assign(state, payload);
        },
        // 通知父应用
        emitGlobalState (state) {
          if (props.setGlobalState) {
            props.setGlobalState(state);
          }
        },
      },
    };
    store.registerModule('global', globalModule);
  } else {
    // 每次mount时，都同步一次父应用数据
    store.dispatch('global/initGlobalState', initState);
  }
};

export default registerGlobalModule;

/**
 * ps: 该方案也是有缺点的，由于子应用是在mount时才会同步父应用下发的state的。因此，它只适合每次只mount一个子应用的架构（不适合多个子应用共存）；若父应用数据有变化而子应用又没触发mount，则父应用最新的数据无法同步回子应用。想要做到多子应用共存且父动态传子，子应用还是需要用到qiankun提供的onGlobalStateChange的api监听才行，

作者：fengxianqi
链接：https://juejin.cn/post/6875462470593904653
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */