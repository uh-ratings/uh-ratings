import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Professor from '../components/Professor';
import { Professors } from '../../api/professor/Professors';
import { Reviews } from '../../api/review/Reviews';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProfessors extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className="uhmanoa-professors-background">
        <Container>
          <Header as="h2" textAlign="center" inverted>List Professors</Header>
          <Card.Group>
            {this.props.professors.map((professor, index) => <Professor key={index} professor={professor} reviews={this.props.reviews.filter(review => (review.contactId === professor._id))}/>)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ListProfessors.propTypes = {
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
})(ListProfessors);
