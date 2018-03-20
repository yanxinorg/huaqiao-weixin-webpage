import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListReportComponent} from './report/list-report/list-report.component';
import {DetailReportComponent} from './report/detail-report/detail-report.component';
import {ListCardComponent} from './card/list-card/list-card.component';
import {DetailCardComponent} from './card/detail-card/detail-card.component';
import {DetailUserComponent} from './user/detail-user/detail-user.component';
import {NewCardComponent} from './card/new-card/new-card.component';
import {DetailReportSnapshotComponent} from './report/detail-report-snapshot/detail-report-snapshot.component';
import {MapBaiduComponent} from './tools/map-baidu/map-baidu.component';
import {ReportInspectionResolver} from './services/resolvers/report.resolver';
import {CardListResolver, RemoveCardResolver} from './services/resolvers/card.resolver';
import {NewCardCheckedComponent} from './card/new-card-checked/new-card-checked.component';
import {UnbindCardComponent} from './card/unbind-card/unbind-card.component';
import {UserInfoResolver} from './services/resolvers/user.resolver';

const __ROUTES__: Routes = [
    {
        path: 'report',
        children: [
            {
                path: 'list',
                component: ListReportComponent
            },
            {
                path: 'detail',
                component: DetailReportComponent,
                resolve: {
                    reportInspectionResolver: ReportInspectionResolver
                }
            },
            {
                path: 'snapshot',
                component: DetailReportSnapshotComponent
            }
        ]
    },
    {
        path: 'card',
        children: [
            {
                path: 'list',
                component: ListCardComponent,
                resolve: {
                    cardListResolver: CardListResolver
                }
            },
            {
                path: 'detail',
                component: DetailCardComponent
            },
            {
                path: 'new',
                component: NewCardComponent
            },
            {
                path: 'check',
                component: NewCardCheckedComponent
            },
            {
                path: 'unbind',
                component: UnbindCardComponent,
                resolve: {
                    removeCardResolver: RemoveCardResolver
                }
            }
        ]
    },
    {
        path: 'user',
        children: [
            {
                path: 'detail',
                component: DetailUserComponent,
                resolve: {
                    userInfoResolver: UserInfoResolver
                }
            }
        ]
    },
    {
        path: 'tools',
        children: [
            {
                path: 'map',
                component: MapBaiduComponent
            }
        ]
    }
];

@NgModule({
    // The forRoot() method is called because a configured router is provided at the app's root.
    // The forRoot() method supplies the Router service providers and directives needed for routing.
    // And performs the initial navigation based on the current browser URL.
    imports: [RouterModule.forRoot(
        __ROUTES__,
        {
            enableTracing: false        // <-- debugging purposes only
        }
    )],
    exports: [RouterModule],
    providers: [
        ReportInspectionResolver,
        CardListResolver,
        RemoveCardResolver,
        UserInfoResolver
    ]
})
export class AppRouterModule {
}
