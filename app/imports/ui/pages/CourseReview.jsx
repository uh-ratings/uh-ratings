import React from 'react';
import { Grid, Loader, Rating, Header, Card, Feed } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Courses } from '../../api/course/Courses';
import { Reviews } from '../../api/review/Reviews';
import AddReview from '../components/AddReview';
import Review from '../components/Review';

/** Renders the Page for editing a single document. */
class CourseReview extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const courseArr = this.props.reviews.filter(review => review.contactId === this.props.course._id);
    let rate;
    if (courseArr.length !== 0) {
      const total = courseArr.reduce((x, y) => ({ rating: x.rating + y.rating }));
      rate = total.rating / courseArr.length;
    } else {
      rate = 3;
    }
    return (
      <Grid container columns={3}>
        <Grid.Column width={4}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{this.props.course.name}</Card.Header>
              <Card.Meta>
                <Rating disabled icon='star' defaultRating={rate} maxRating={5}/>
              </Card.Meta>
              <Card.Description>
                <Header as={'h4'}>Teach by {this.props.course.professor}</Header>
                <Header as={'h4'}>Semester offered: {this.props.course.semester}</Header>
                <Header as={'h4'}>{this.props.course.description}</Header>
              </Card.Description>
            </Card.Content>
          </Card>
          <AddReview contactId={this.props.course._id}/>
        </Grid.Column>
        <Grid.Column width={2}>
          <br/>
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>Reviews</Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                {courseArr.map((review, index) => <Review key={index} review={review}/>)}
              </Feed>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
CourseReview.propTypes = {
  course: PropTypes.object,
  reviews: PropTypes.array.isRequired,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Contact documents.
  const subscription = Meteor.subscribe(Courses.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the document
  const course = Courses.collection.findOne(documentId);
  const reviews = Reviews.collection.find({}).fetch();
  return {
    course,
    reviews,
    ready,
  };
})(CourseReview);
