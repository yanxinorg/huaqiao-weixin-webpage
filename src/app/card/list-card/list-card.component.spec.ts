import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ListCardComponent} from './list-card.component';
import {ActivatedRouteStub, RouterStub} from '../../mock/router.stub';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';
import {By} from '@angular/platform-browser';

describe('ListCardComponent', () => {
    let component: ListCardComponent;
    let fixture: ComponentFixture<ListCardComponent>;
    let activatedRouteStub: ActivatedRouteStub;
    const data = [
        {
            cardid: 'AAAAAAAA',
            name: 'TEST-1',
            phone: '111-1111-1111',
            isShowMore: false,
            isDefault: 0
        },
        {
            cardid: 'BBBBBBBB',
            name: 'TEST-2',
            phone: '222-2222-2222',
            isShowMore: false,
            isDefault: 1
        }
    ];

    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({s: 'test-session'});
        activatedRouteStub.setResolver({
            cardListResolver: data
        });
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListCardComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteStub},
                {provide: Router, useClass: RouterStub},
                {provide: BackboneService, useClass: BackboneServiceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('应显示您尚未添加任何就诊卡【 用户未绑定就诊卡时 】', () => {
        activatedRouteStub.setResolver({
            cardListResolver: []
        });
        fixture.detectChanges();
        const bannerDe: DebugElement = fixture.debugElement;
        const paragraphDe = bannerDe.query(By.css('p'));
        const p: HTMLElement = paragraphDe.nativeElement;
        expect(p.textContent).toEqual('您尚未添加就诊卡');
    });

    it('应显示相应数量的就诊卡列表', () => {
        const bannerDe: DebugElement = fixture.debugElement;
        const paragraphDe = bannerDe.query(By.all('.card-item'));
        const cards: HTMLElement = paragraphDe.nativeElement;
        expect(cards.children.length).toEqual(data.length);
        expect(cards.children[0].querySelector('span')).toBeNull();
        expect(cards.children[1].querySelector('span').textContent).toEqual('默认卡');
    });

    it('应显示标志默认卡【 当点击"设为默认"后 】', () => {
        data[0].isShowMore = true;
        fixture.detectChanges();
        const bannerDe: DebugElement = fixture.debugElement;
        const paragraphDe = bannerDe.query(By.all('.card-item'));
        const cards: HTMLElement = paragraphDe.nativeElement;
        const setAsDefaultBtn = cards.children[0].querySelector('button');
        setAsDefaultBtn.triggerEventHandler('click', null);
        fixture.detectChanges();
    });

    it('应不再显示该就诊卡【 解绑后 】', () => {
    });
});
