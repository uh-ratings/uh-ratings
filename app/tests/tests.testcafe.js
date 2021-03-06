import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { homePage } from './home.page';
import { eventPage } from './event.page';
import { addCoursePage } from './addcourse.page';
import { adminPage } from './admin.page';
import { addProfessorPage } from './addprofessor.page';
import { addCourseReviewPage } from './addcoursereview.page';
import { listCoursePage } from './listcourse.page';
import { listProfessorPage } from './listprofessor.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const admin = { username: 'admin@foo.com', password: 'changeme' };
const courseinfo = { name: 'ICS 111', semester: 'Spring, Fall', professor: 'Scott Robert', description: 'basic programming course with Java', cost: '1200', averagetime: '5' };
const professorinfo = { firstName: 'Henri', lastName: 'Casanova', address: 'POST 307, University of Hawaii',
  image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4',
  description: 'I am originally from France. I maintain a list of reports from my surf sessions. I have proof that I ran the Hana relay with an actual Team.', course: 'ICS111, ICS211' };
const coursereview = { review: 'Great', rating: '5' };
const professorreview = { review: 'Great', rating: '5' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that home page shows up after login', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await homePage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that event page shows up without login', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoEventPage(testController);
  await eventPage.isDisplayed(testController);
});

test('Test that event page shows up after login', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoEventPage(testController);
  await eventPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the list Course page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.gotoListcoursePage(testController);
  await listCoursePage.isDisplayed(testController, courseinfo.name);
});

test('Test the Add Course page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.gotoAddcoursePage(testController);
  await addCoursePage.addCourse(testController, courseinfo.name, courseinfo.semester, courseinfo.professor, courseinfo.description, courseinfo.cost, courseinfo.averagetime);
  await navBar.gotoListcoursePage(testController);
  await navBar.gotoListcoursePage(testController);
  await addCoursePage.CheckAddcourse(testController, courseinfo.name);
});

test('Test the Add Course Review page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.gotoListcoursePage(testController);
  await addCourseReviewPage.addCourseReview(testController, coursereview.review, coursereview.rating);
  await navBar.gotoListcoursePage(testController);
  await addCourseReviewPage.CheckAddcourseReview(testController, coursereview.review);
});

test('Test the list Professor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.gotoListprofessorPage(testController);
  await listProfessorPage.isDisplayed(testController, courseinfo.name);
});

test('Test the Add Professor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.gotoAddprofessorPage(testController);
  await addProfessorPage.addProfessor(testController, professorinfo.firstName, professorinfo.lastName, professorinfo.address, professorinfo.image, professorinfo.description, professorinfo.course);
  await navBar.gotoListprofessorPage(testController);
  await navBar.gotoListprofessorPage(testController);
  await addProfessorPage.CheckAddprofessor(testController, `${professorinfo.firstName} ${professorinfo.lastName}`);
});

test('Test the Add Professor Review page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.gotoListcoursePage(testController);
  await addCourseReviewPage.addCourseReview(testController, professorreview.review, professorreview.rating);
  await navBar.gotoListcoursePage(testController);
  await addCourseReviewPage.CheckAddcourseReview(testController, professorreview.review);
});

test('Test that admin page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, admin.username, admin.password);
  await navBar.gotoAdminPage(testController);
  await adminPage.isDisplayed(testController);
  await adminPage.admintrash(testController);
});
