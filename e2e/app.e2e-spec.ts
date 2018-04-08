import {AppPage} from './app.po';

describe('huaqiao-weixin-webpage App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display welcome message', () => {
        page.navigateTo('/report/list');
        expect(page.getQueryButton()).toEqual('查询');
    });
});
