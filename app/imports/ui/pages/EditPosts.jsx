import React from 'react';
import { Loader, Header, Container, Card } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Courses } from '../../api/course/Courses';
import { Professors } from '../../api/professor/Professors';
import Professor from '../components/Professor';
import Course from '../components/Course';

const bridge = new SimpleSchema2Bridge(Courses.schema);
const bridge2 = new SimpleSchema2Bridge(Professors.schema);

/** Renders the Page for editing a single document. */
class EditPosts extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { semester, name, professor, ratings, description, cost, averagetime, firstName, lastName, address, image, course, _id } = data;
    Courses.collection.update(_id, { $set: { semester, name, professor, ratings, description, cost, averagetime } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
    Professors.collection.update(_id, { $set: { firstName, lastName, address, ratings, description, image, course } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>Edit Posts</Header>
        <hr></hr>
        <Header as="h3" textAlign="center" inverted>Professors</Header>
        <Card.Group>
          {this.props.professors.map((professor, index) => <Professor key={index} professor={professor}/>)}
        </Card.Group>
        <hr></hr>
        <Header as="h3" textAlign="center" inverted>Courses</Header>
        <Card.Group>
          {this.props.courses.map((course, index) => <Course key={index} course={course}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
EditPosts.propTypes = {
  doc: PropTypes.object,
  doc2: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
  professors: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Contact documents.
  const subscription = Meteor.subscribe(Courses.userPublicationName);
  const subscription2 = Meteor.subscribe(Professors.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the document
  const doc = Courses.collection.findOne(documentId);
  const doc2 = Professors.collection.findOne(documentId);
  const courses = Courses.collection.find({}).fetch();
  const professors = Professors.collection.find({}).fetch();
  return {
    doc,
    doc2,
    courses,
    professors,
    ready,
  };
})(EditPosts);
