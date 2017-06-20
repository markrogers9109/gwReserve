import { browser, by, element } from 'protractor';

export class GwReservePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('gw-root h1')).getText();
  }
}