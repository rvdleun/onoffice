import { ElectronAngularBoilerplatePage } from './app.po';

describe('electron-angular-boilerplate App', () => {
  let page: ElectronAngularBoilerplatePage;

  beforeEach(() => {
    page = new ElectronAngularBoilerplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
