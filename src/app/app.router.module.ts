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
                component: ListCardComponent

            },
            {
                path: 'detail',
                component: DetailCardComponent
            },
            {
                path: 'new',
                component: NewCardComponent
            }
        ]
    },
    {
        path: 'user',
        children: [
            {
                path: 'detail',
                component: DetailUserComponent
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
        ReportInspectionResolver
    ]
})
export class AppRouterModule {
}
