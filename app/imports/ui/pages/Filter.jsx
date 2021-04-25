import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Button, Form, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Professor from '../components/Professor';
import { Professors } from '../../api/professor/Professors';
import { Reviews } from '../../api/review/Reviews';

const semester = [
  { key: 'fall', text: 'Fall', value: 'fall' },
  { key: 'spring', text: 'Spring', value: 'spring' },
  { key: 'summer', text: 'Summer', value: 'summer' },
];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Filter extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Segment inverted>
          <Form inverted>
            <Form.Group widths='equal'>
              <Form.Select fluid label='Professor' placeholder='Professor' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select fluid label='Semester' placeholder='Semester' options={semester}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select fluid label='Course' placeholder='Course' />
            </Form.Group>
            <Button type='submit'>Submit</Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
Filter.propTypes = {
  professors: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Professors.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const professors = Professors.collection.find({}).fetch();
  const reviews = Reviews.collection.find({}).fetch();
  return {
    professors,
    reviews,
    ready,
  };
})(Filter);
