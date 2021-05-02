import { Selector } from 'testcafe';

class AddProfessorPage {

  constructor() {
    this.pageId = '#add-professor';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addProfessor(testController, firstname, lastname, address, image, description, course) {
    await this.isDisplayed(testController);
    await testController.typeText('#addprofessor-firstname', firstname);
    await testController.typeText('#addprofessor-lastname', lastname);
    await testController.typeText('#addprofessor-address', address);
    await testController.typeText('#addprofessor-image', image);
    await testController.typeText('#addprofessor-description', description);
    await testController.typeText('#addprofessor-course', course);
    await testController.click('#addprofessor-submit');
  }

  async CheckAddprofessor(testController, name) {
    const professornames = Selector('#professor-name').withExactText(name);
    await testController.expect(professornames.exists).ok();
  }
}

export const addProfessorPage = new AddProfessorPage();
