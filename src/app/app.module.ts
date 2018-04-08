import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {BaiduMapModule} from 'angular2-baidu-map';
import {HttpClientModule} from '@angular/common/http';
import {WidgetModule} from './widget/widget.module';

import {LocalStorageService} from './services/local.storage.service';
import {BackboneService} from './services/backbone.service';
import {AuthGuardService} from './services/auth-guard.service';

import {AppComponent} from './app.component';
import {AppRouterModule} from './app.router.module';
import {ListReportComponent} from './report/list-report/list-report.component';
import {ListCardComponent} from './card/list-card/list-card.component';
import {DetailReportComponent} from './report/detail-report/detail-report.component';
import {DetailCardComponent} from './card/detail-card/detail-card.component';
import {DetailUserComponent} from './user/detail-user/detail-user.component';
import {NewCardComponent} from './card/new-card/new-card.component';
import {DetailReportSnapshotComponent} from './report/detail-report-snapshot/detail-report-snapshot.component';
import {MapTencentComponent} from './tools/map-tencent/map-tencent.component';
import {MapBaiduComponent} from './tools/map-baidu/map-baidu.component';
import {MapAliComponent} from './tools/map-ali/map-ali.component';
import {NewCardCheckedComponent} from './card/new-card-checked/new-card-checked.component';
import {UnbindCardComponent} from './card/unbind-card/unbind-card.component';

@NgModule({
    declarations: [
        AppComponent,
        ListReportComponent,
        ListCardComponent,
        DetailReportComponent,
        DetailCardComponent,
        NewCardComponent,
        NewCardCheckedComponent,
        DetailUserComponent,
        DetailReportSnapshotComponent,
        MapBaiduComponent,
        MapTencentComponent,
        MapAliComponent,
        UnbindCardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgbModule.forRoot(),
        BaiduMapModule.forRoot({ak: 'aclQwBnKi2ggQle8jOqEhUqL6QPiLuzq'}),
        WidgetModule,
        AppRouterModule
    ],
    providers: [
        LocalStorageService,
        BackboneService,
        AuthGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
