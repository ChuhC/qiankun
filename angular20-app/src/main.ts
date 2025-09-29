import './public-path';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { About } from './app/pages/about'
import { Home } from './app/pages/home'
import { Card } from './app/card/card'
import { ApplicationRef } from '@angular/core';
import { ɵgetComponentDef } from '@angular/core';

const pageMap: Record<string, any> = {
  About,
  Home,
  Card,
  App
}
// 应用引用和状态管理
let appRef: ApplicationRef | null = null;

async function render(props: any = {}) {
  const { container,id = 'angular-app', defaultPage = 'App' } = props;
  // 确定挂载点
  let mountElement = container
    ? container.querySelector(`#${id}`)
    : document.getElementById(id);
  
  // 如果找不到元素，则创建新的挂载点
  if (!mountElement) {
    mountElement = document.createElement('div');
    mountElement.id = id;
    // 找到 Qiankun 的包装器
    const qiankunWrapper = container || document.querySelector('[data-qiankun]');
    if (qiankunWrapper) {
      qiankunWrapper.appendChild(mountElement);
    } else {
      document.body.appendChild(mountElement);
    }
    console.log(`创建新的挂载点: #${id}`);
  }
  const component = pageMap[defaultPage] || App;
  if (!mountElement.querySelector(ɵgetComponentDef(component)?.selectors)) {
    mountElement.innerHTML = `<${ɵgetComponentDef(component)?.selectors}></${ɵgetComponentDef(component)?.selectors}>`;
  }

  // 启动 Angular 应用
  appRef = await bootstrapApplication(component, {
    providers: [
      // 可以注入主应用传递的 props
      { provide: 'qiankunProps', useValue: props },
    ],
  });

  return appRef;
}
  // 独立运行逻辑（非微前端环境）
  if (!(window as any).__POWERED_BY_QIANKUN__) {
    render().then(app => {
      if (app) {
        console.log('Angular standalone application bootstrapped');
      }
    });
  }

  // 微前端生命周期 ==============================================

  /**
   * 启动生命周期
   */
  export async function bootstrap(props: Record<string, any>): Promise<void> {
    console.log('[Angular] bootstrap with props:', props);
  }

  /**
   * 挂载生命周期
   */
  export async function mount(props: Record<string, any>): Promise<ApplicationRef | null> {
    console.log('[Angular] mount with props:', props);
    return render(props)
  }

  /**
   * 卸载生命周期
   */
  export async function unmount(props: Record<string, any>): Promise<void> {
    console.log('[Angular] unmount with props:', props);

    // 销毁Angular应用
    if (appRef) {
      appRef.destroy();
      appRef = null;
    }

    const container = props['container'] || document.getElementById('single-spa-application:app-angular');
    if (container) {
      container.innerHTML = '';
      container.remove();
    }
  }

  // 类型声明 ===================================================
  declare global {
    interface Window {
      __POWERED_BY_QIANKUN__?: boolean;
      __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
    }
  }