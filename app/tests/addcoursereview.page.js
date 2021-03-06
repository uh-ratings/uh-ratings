import { Selector } from 'testcafe';

class AddCourseReviewPage {

  constructor() {
    this.pageId = '#add-course-review';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addCourseReview(testController, review, rating) {
    await testController.click('#addcoursereview-temp');
    await testController.typeText('#addreview-rating', rating);
    await testController.typeText('#addreview-review', review);
    await testController.click('#addreview-submit');
  }

  async CheckAddcourseReview(testController, review) {
    const coursereview = Selector('#course-review').withExactText(review);
    await testController.expect(coursereview.exists).ok();
  }
}

export const addCourseReviewPage = new AddCourseReviewPage();
