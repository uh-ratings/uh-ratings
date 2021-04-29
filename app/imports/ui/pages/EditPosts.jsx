import React from 'react';
import { Loader, Header, Container, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Courses } from '../../api/course/Courses';
import { Professors } from '../../api/professor/Professors';
import Professor from '../components/Professor';
import Course from '../components/Course';

/** Renders the Page for editing a single document. */
class EditPosts extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const headerStyle = { paddingTop: '20px', paddingBottom: '20px', color: 'white', backgroundColor: 'rgba(2, 71, 49, 0.7)' };
    return (
      <div className='uhmanoa-editposts-background'>
        <Container>
          <Header as="h2" textAlign="center" inverted>My Posts</Header>
          <hr></hr>
          <Header as="h3" textAlign="center" style={headerStyle} >Professors</Header>
          <Card.Group>
            {this.props.professors.map((professor, index, review) => <Professor key={index} professor={professor} reviews={review}/>)}
          </Card.Group>
          <hr></hr>
          <Header as="h3" textAlign="center" style={headerStyle} >Courses</Header>
          <Card.Group>
            {this.props.courses.map((course, index, review) => <Course key={index} course={course} reviews={review}/>)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
EditPosts.propTypes = {
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
  professors: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  // Get access to Contact documents.
  const subscription = Meteor.subscribe(Courses.userPublicationName);
  const subscription2 = Meteor.subscribe(Professors.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  return {
    courses: Courses.collection.find({}).fetch(),
    professors: Professors.collection.find({}).fetch(),
    ready,
  };
})(EditPosts);
