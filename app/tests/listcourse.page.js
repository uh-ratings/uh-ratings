import { Selector } from 'testcafe';

class ListCoursePage {
  constructor() {
    this.pageId = '#list-course';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }
}

export const listCoursePage = new ListCoursePage();
