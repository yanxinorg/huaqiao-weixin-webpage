import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {LocalStorageService} from './services/local.storage.service';

import {AppComponent} from './app.component';
import {AppRouterModule} from './app.router.module';
import {ListReportComponent} from './report/list-report/list-report.component';
import {ListCardComponent} from './card/list-card/list-card.component';
import {DetailReportComponent} from './report/detail-report/detail-report.component';
import {DetailCardComponent} from './card/detail-card/detail-card.component';
import {DetailUserComponent} from './user/detail-user/detail-user.component';
import {NewCardComponent} from './card/new-card/new-card.component';
import {DetailReportSnapshotComponent} from './report/detail-report-snapshot/detail-report-snapshot.component';
import {MapBaiduComponent} from './tools/map-baidu/map-baidu.component';
import {BaiduMapModule} from 'angular2-baidu-map';

@NgModule({
    declarations: [
        AppComponent,
        ListReportComponent,
        ListCardComponent,
        DetailReportComponent,
        DetailCardComponent,
        NewCardComponent,
        DetailUserComponent,
        DetailReportSnapshotComponent,
        MapBaiduComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
        BaiduMapModule.forRoot({ak: 'aclQwBnKi2ggQle8jOqEhUqL6QPiLuzq'}),
        AppRouterModule
    ],
    providers: [
        LocalStorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
