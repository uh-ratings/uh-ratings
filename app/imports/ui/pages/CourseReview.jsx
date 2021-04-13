import React from 'react';
import { Grid, Loader, Rating, Header, Form, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Courses } from '../../api/course/Courses';

const options = [
  { key: 's', text: 'Spring', value: 'spring' },
  { key: 'f', text: 'Fall', value: 'fall' },
  { key: 'o', text: 'Other', value: 'other' },
];

/** Renders the Page for editing a single document. */
class CourseReview extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container columns={2}>
        <Grid.Column>
          <Header inverted as={'h2'}>{this.props.course.name}</Header>
          <Header inverted as={'h4'}>Teach by {this.props.course.professor}</Header>
          <Header inverted as={'h4'}>Semester offered: {this.props.course.semester}</Header>
          <Header inverted as={'h4'}>{this.props.course.description}</Header>
        </Grid.Column>
        <Grid.Column>
          <Form>
            <Header inverted as={'h2'}>Write a Review</Header>
            <Form.Field>
              <Rating size={'huge'} icon={'star'} maxRating={5} defaultRating={1}/>
            </Form.Field>
            <Form.Field>
              <label className={'white-label'}>Professor</label>
              <Form.Input placeholder='the professor taught the course'/>
            </Form.Field>
            <Form.Field>
              <label className={'white-label'}>Semester</label>
              <Form.Select placeholder='the semester you took' options={options}/>
            </Form.Field>
            <Form.Field>
              <label className={'white-label'}>Your review</label>
              <Form.Input name={'review'} placeholder='write your review'/>
            </Form.Field>
            <Button>Submit</Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
CourseReview.propTypes = {
  course: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Contact documents.
  const subscription = Meteor.subscribe(Courses.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const course = Courses.collection.findOne(documentId);
  return {
    course,
    ready,
  };
})(CourseReview);
