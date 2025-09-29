import { Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Home } from './pages/home';
import { About } from './pages/about';
import { Card } from './card/card';
// import { ProductListComponent } from './products/product-list/product-list.component';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: '首页'
    },
    {
        path: 'about',
        component: About,
        title: '关于我们'
    },
    {
        path: 'home',
        component: About,
        title: '首页'
    },
    {
        path: 'card',
        component: Card,
        title: '卡片'
    }
    // {
    //     path: 'about',
    //     loadComponent: () => import('./pages/about')
    //         .then(c => c.About),
    // },
    // {
    //     path: 'products',
    //     component: ProductListComponent,
    //     title: '产品列表'
    // },
];
// 路由模块配置
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: (window as any).__POWERED_BY_QIANKUN__ ? '/app-angular' : '/'
        }
    ]
})
export class AppRoutingModule { }