import { Selector } from 'testcafe';

class AddProfessorReviewPage {

  constructor() {
    this.pageId = '#add-professor-review';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addProfessorReview(testController, review, rating) {
    await testController.click('#addprofessorreview-temp');
    await testController.typeText('#addreview-rating', rating);
    await testController.typeText('#addreview-review', review);
    await testController.click('#addreview-submit');
  }

  async CheckAddprofessorReview(testController, review) {
    const coursereview = Selector('#professor-review').withExactText(review);
    await testController.expect(coursereview.exists).ok();
  }
}

export const addProfessorReviewPage = new AddProfessorReviewPage();
