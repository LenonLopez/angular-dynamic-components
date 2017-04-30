import { DynamicComponentTestPage } from './app.po';

describe('dynamic-component-test App', () => {
  let page: DynamicComponentTestPage;

  beforeEach(() => {
    page = new DynamicComponentTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
