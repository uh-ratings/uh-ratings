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
    await testController.typeText('#addcoursereview-rating', rating);
    await testController.typeText('#addcoursereview-review', review);
    await testController.click('#addcoursereview-submit');
  }

  async CheckAddcourseReview(testController, review) {
    const coursereview = Selector('#course-review').withExactText(review);
    await testController.expect(coursereview.exists).ok();
  }
}

export const addCourseReviewPage = new AddCourseReviewPage();
