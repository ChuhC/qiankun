import './public-path';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {About} from './app/pages/about'
import {Home} from './app/pages/home'

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

import { enableProdMode, ApplicationRef, EnvironmentInjector } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { APP_BASE_HREF } from '@angular/common';

// if (environment.production) {
//   enableProdMode();
// }
interface QiankunProps {
  container?: HTMLElement;
  [key: string]: any; // 允许其他任意属性
}

const pageMap: Record<string, any> = {
  About,
  App
}
// 应用引用和状态管理
let appRef: ApplicationRef | null = null;

/**
 * 渲染Angular应用
 * @param props 微前端属性
 * @returns Promise<ApplicationRef | null>
 */
async function render(props?: QiankunProps): Promise<ApplicationRef | null> {
  console.log('Angular渲染');
  console.log(props);
  
  const { container,id,defaultPage } = props || {};
  // // const targetContainer = container || ensureContainer(id || 'angularContainer');
  //   const pageMap: Record<string, any> = {
  //   About,
  //   App
  // }
  // const container1 = (props as QiankunProps).container || document.createElement('div');
  // container1.innerHTML = '<app-about></app-about>'; // 插入选择器
  // document.body.appendChild(container1);
  console.log(id,'+++++++++++++++++++++',defaultPage);
  
  //  // 确定挂载点
  //  let mountElement = container
  //   ? container.querySelector(`#${id}`)
  //   : document.getElementById(id)
  //  // 如果找不到元素，则创建新的挂载点
  //   if (!mountElement) {
  //   mountElement = document.createElement('div')
  //   mountElement.id = id
  //     // 找到Qiankun的包装器
  //   const qiankunWrapper = container || document.querySelector('[data-qiankun]')
  //   if (qiankunWrapper) {
  //     qiankunWrapper.appendChild(mountElement)
  //   } else {
  //     document.body.appendChild(mountElement)
  //   }
  try {
    // 应用配置
    const appConfig = {
      providers: [
        // provideRouter(routes),
        // {
        //   provide: APP_BASE_HREF,
        //   useValue: (window as any).__POWERED_BY_QIANKUN__ ? '/app-angular' : '/'
        // },
        {
          provide: 'qiankunProps',
          useValue: props
        }
      ]
    };
    console.log(defaultPage);
    
    const component = pageMap[defaultPage] || App
    
    // 启动应用
    const application = await bootstrapApplication(component, appConfig);
    appRef = application;
    return application;
  } catch (err) {
    console.error('Angular bootstrap error:', err);
    return null;
  }
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
  // return render(props);
  const container = ensureContainer('"angularContainer"');
  return render({ ...props, container });
}
// 在主应用挂载点创建时（必须执行在Angular启动前）
function ensureContainer(id: string): HTMLElement {
  let container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    document.body.appendChild(container);
  }
  return container;
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