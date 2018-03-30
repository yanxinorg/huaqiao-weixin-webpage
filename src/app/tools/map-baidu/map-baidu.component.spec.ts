import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapBaiduComponent} from './map-baidu.component';
import {BaiduMapModule} from 'angular2-baidu-map';

describe('MapBaiduComponent', () => {
    let component: MapBaiduComponent;
    let fixture: ComponentFixture<MapBaiduComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BaiduMapModule.forRoot({ak: 'aclQwBnKi2ggQle8jOqEhUqL6QPiLuzq'})
            ],
            declarations: [MapBaiduComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapBaiduComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
