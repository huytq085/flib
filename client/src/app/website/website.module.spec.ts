import { WebsiteModule } from './website.module';

describe('WebsiteModule', () => {
  let websiteModule: WebsiteModule;

  beforeEach(() => {
    websiteModule = new WebsiteModule();
  });

  it('should create an instance', () => {
    expect(websiteModule).toBeTruthy();
  });
});
