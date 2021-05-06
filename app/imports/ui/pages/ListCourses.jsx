import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Course from '../components/Course';
import { Courses } from '../../api/course/Courses';
import { Reviews } from '../../api/review/Reviews';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCourses extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className="uhmanoa-listcourses-background" id='list-course'>
        <Container>
          <Header as="h2" textAlign="center" inverted>List Courses</Header>
          <Card.Group>
            {this.props.courses.map((course, index) => <Course key={index} course={course} reviews={this.props.reviews.filter(review => (review.contactId === course._id))}/>)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ListCourses.propTypes = {
  courses: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Courses.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const courses = Courses.collection.find({}).fetch();
  const reviews = Reviews.collection.find({}).fetch();
  return {
    courses,
    reviews,
    ready,
  };
})(ListCourses);
