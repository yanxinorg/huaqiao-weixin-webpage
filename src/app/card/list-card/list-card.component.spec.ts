import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ListCardComponent} from './list-card.component';
import {ActivatedRouteStub, RouterLinkDirectiveStub} from '../../mock/router.stub';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';
import {By} from '@angular/platform-browser';
import {click} from '../../mock/helper';
import {LocalStorageService} from '../../services/local.storage.service';

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
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({s: 'test-session'});
        activatedRouteStub.setResolver({
            cardListResolver: data
        });
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListCardComponent, RouterLinkDirectiveStub],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteStub},
                // {provide: Router, useClass: RouterSpy},
                {provide: Router, useValue: routerSpy},
                {provide: LocalStorageService, useClass: LocalStorageService},
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
        const paragraphDe = bannerDe.query(By.css('.container'));
        const cards: HTMLElement = paragraphDe.nativeElement;
        expect(cards.children.length).toEqual(data.length, '总共应有两张就诊卡');
        expect(cards.children[0].querySelector('span')).toBeNull('第一张就诊卡不显示"默认卡"的标志');
        expect(cards.children[1].querySelector('span').textContent).toEqual('默认卡', '第二张就诊卡显示"默认卡"的标志');
    });

    it('应显示标志默认卡【 当点击"设为默认"后 】', fakeAsync(() => {
        data[0].isShowMore = true;
        fixture.detectChanges();
        const bannerDe: DebugElement = fixture.debugElement;
        const setAsDefaultBtn = bannerDe.query(By.css('button'));
        expect(setAsDefaultBtn.nativeElement.textContent.trim()).toEqual('设为默认', '点击“...”按键后应显示“设为默认”的功能按键');
        /**
         * 模拟用户点击" 设为默认 "
         * 设置第一张就诊卡为默认卡
         */
        setAsDefaultBtn.triggerEventHandler('click', null);
        tick();                     // flush the observable
        fixture.detectChanges();    // update view

        const paragraphDe = bannerDe.query(By.css('.container'));
        const cards: HTMLElement = paragraphDe.nativeElement;
        expect(cards.children.length).toEqual(data.length, '总共应有两张就诊卡');
        expect(cards.children[1].querySelector('span')).toBeNull('第二张就诊卡原来为默认卡，现在不再显示"默认卡"的标志');
        expect(cards.children[0].querySelector('span').textContent).toEqual('默认卡', '第一张就诊卡显示"默认卡"的标志');
    }));

    it('应跳转至解绑流程【 当点击"解绑"后 】', fakeAsync(() => {
        data[0].isShowMore = true;
        fixture.detectChanges();
        const bannerDe: DebugElement = fixture.debugElement;
        const paragraphDe = bannerDe.query(By.css('.more'));
        const unbindBtnDe = paragraphDe.children[1];

        click(unbindBtnDe);
        tick();                     // flush the observable

        const router = fixture.debugElement.injector.get(Router);
        const spy = router.navigate as jasmine.Spy;
        expect(spy.calls.any()).toBeTruthy('应路由至新Component');
        expect(spy.calls.argsFor(0)[0][0]).toBe('/card/unbind', '路由路径应为/card/unbind');
    }));

    it('应跳转至添加就诊卡流程【 当点击"添加就诊卡"后 】', () => {
        // find DebugElements with an attached RouterLinkStubDirective
        const linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
        // get attached link directive instances
        // using each DebugElement's injector
        const routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
        expect(routerLinks.length).toBe(1, '应该显示“添加就诊卡”的按键');
        expect(routerLinks[0].linkParams[0]).toBe('/card/new', '检查路由的第一个参数应为路径 /card/new');
        // expect(routerLinks[0].linkParams[1].s).toBe('test-session', '检查路由的第二个参数应为参数 test-session');
        expect(routerLinks[0].navigatedTo).toBeNull('未跳转前，navigatedTo应为null');
        /**
         *   点击 "添加就诊卡" 后
         */
        linkDes[0].triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(routerLinks[0].navigatedTo[0]).toBe('/card/new', '检查路由的第一个参数应为路径 /card/new');
        // expect(routerLinks[0].navigatedTo[1].s).toBe('test-session', '检查路由的第二个参数应为参数 test-session');
    });
});
