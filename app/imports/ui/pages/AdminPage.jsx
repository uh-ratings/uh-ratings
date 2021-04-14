import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Professors } from '../../api/professor/Professors';
import { Courses } from '../../api/course/Courses';
import Admin from '../components/Admin';
import AdminCourses from '../components/AdminCourses';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AdminPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>Professors</Header>
        <Card.Group>
          {this.props.professors.map((professor, index) => <Admin key={index} professor={professor}/>)}
        </Card.Group>
        <hr></hr>
        <Header as="h2" textAlign="center" inverted>Courses</Header>
        <Card.Group>
          {this.props.courses.map((course, index) => <AdminCourses key={index} course={course}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
AdminPage.propTypes = {
  courses: PropTypes.array.isRequired,
  professors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Professors.adminPublicationName);
  const subscription2 = Meteor.subscribe(Courses.adminPublicationName);
  // Determine if the subscription is ready
  return {
    professors: Professors.collection.find({}).fetch(),
    courses: Courses.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(AdminPage);
