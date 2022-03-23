import Vue from "vue";
import { createApp } from "vue";
import { createPinia } from 'pinia'

import routes from "./router";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import {
  renderWithQiankun,
  qiankunWindow,
  QiankunProps,
} from "vite-plugin-qiankun/dist/helper";
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.less'

// createApp(App).use(router).mount('#app')

let router = null;
let instance: Vue.App<Element> | null;

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: string;
  }
}

interface IRenderProps {
  container: Element | string | undefined | QiankunProps;
}

function render(props: any) {
  // IRenderProps) {
  const { container } = props;
  const history = createWebHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? "/sub-vite" : "/"
  );
  router = createRouter({
    history,
    routes,
  });

  instance = createApp(App);
  // instance.use(createPinia())
  instance.use(router);
  // instance.use(Antd)
  instance.mount(container ? container.querySelector("#app") : "#app");
}
// some code
renderWithQiankun({
  bootstrap() {
    console.log("bootstrap");
  },
  mount(props) {
    console.log("mount");
    render(props);
  },
  unmount(props: any) {
    console.log("unmount");
    instance && instance.unmount();
    instance = null
    router = null
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}

/* // 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({ container: "#app" });
}
//暴露主应用生命周期钩子
export async function bootstrap() {
  console.log("subapp bootstraped");
}

export async function mount(props: any) {
  console.log("mount subapp");
  render(props);
}

export async function unmount() {
  console.log("unmount college app");
  instance.unmount();
} */
