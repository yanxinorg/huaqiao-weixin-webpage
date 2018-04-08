import {browser, by, element} from 'protractor';

export class AppPage {
    navigateTo(path: string) {
        // browser.get(address, timeout_in_millis)
        return browser.get(path);
    }

    // getParagraphText() {
    //     return element(by.css('app-root h1')).getText();
    // }

    getQueryButton() {
        return element(by.css('#btn-query')).getText();
    }
}
