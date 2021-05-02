import { Selector } from 'testcafe';

class AddCoursePage {

  constructor() {
    this.pageId = '#add-course';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addCourse(testController, name, semester, professor, description, cost, time) {
    await this.isDisplayed(testController);
    await testController.typeText('#addcourse-name', name);
    await testController.typeText('#addcourse-semester', semester);
    await testController.typeText('#addcourse-professor', professor);
    await testController.typeText('#addcourse-description', description);
    await testController.typeText('#addcourse-cost', cost);
    await testController.typeText('#addcourse-time', time);
    await testController.click('#addcourse-submit');
  }

  async CheckAddcourse(testController, name) {
    const coursenames = Selector('#course-name').withExactText(name);
    await testController.expect(coursenames.exists).ok();
  }
}

export const addCoursePage = new AddCoursePage();
