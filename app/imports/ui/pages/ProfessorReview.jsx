import React from 'react';
import { Grid, Loader, Card, Image, Rating, Header, Feed } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Professors } from '../../api/professor/Professors';
import AddReview from '../components/AddReview';
import Review from '../components/Review';
import { Reviews } from '../../api/review/Reviews';

/** Renders the Page for editing a single document. */
class ProfessorReview extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const arr = this.props.reviews.filter(review => review.contactId === this.props.professor._id);
    let rate;
    if (arr.length !== 0) {
      const total = arr.reduce((a, b) => ({ rating: a.rating + b.rating }));
      rate = total.rating / arr.length;
    } else {
      rate = 3;
    }
    return (
      <Grid container columns={3}>
        <Grid.Column width={4}>
          <Grid.Column>
            <Card>
              <Image size='tiny' src={this.props.professor.image} wrapped ui={false}/>
              <Card.Content>
                <Card.Header>{this.props.professor.firstName} {this.props.professor.lastName}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Rating disabled icon='star' maxRating={5} defaultRating={rate}/>
              </Card.Content>
            </Card>
            <AddReview contactId={this.props.professor._id}/>
          </Grid.Column>
        </Grid.Column>
        <Grid.Column width={2}>
          <br/>
        </Grid.Column>
        <Grid.Column width={10}>
          <Header as={'h2'} inverted>{this.props.professor.course}</Header>
          <Header as={'h4'} inverted>{this.props.professor.description}</Header>
          <Grid.Row>
            <hr/>
          </Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header>Reviews</Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                {arr.map((review, index) => <Review key={index} review={review}/>)}
              </Feed>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
ProfessorReview.propTypes = {
  professor: PropTypes.object,
  reviews: PropTypes.array.isRequired,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Contact documents.
  const subscription = Meteor.subscribe(Professors.userPublicationName);
  const subscription2 = Meteor.subscribe(Reviews.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the document
  const professor = Professors.collection.findOne(documentId);
  const reviews = Reviews.collection.find({}).fetch();
  return {
    professor,
    reviews,
    ready,
  };
})(ProfessorReview);
