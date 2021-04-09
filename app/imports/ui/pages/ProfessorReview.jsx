import React from 'react';
import { Grid, Loader, Card, Image, Rating, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Professors } from '../../api/professor/Professors';

/** Renders the Page for editing a single document. */
class ProfessorReview extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Card>
              <Image size='tiny' src={this.props.professor.image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{this.props.professor.firstName} {this.props.professor.lastName}</Card.Header>
                <Card.Description>
                  {this.props.professor.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Rating disabled icon='star' maxRating={5} defaultRating={3}/>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Header as={'h2'}>{this.props.professor.course}</Header>
            <p>Description</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header>Student</Header>
            <Rating disabled icon='star' maxRating={5} defaultRating={4}/>
          </Grid.Column>
          <Grid.Column>
            <p>Reviews</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

// Require the presence of a Contact document in the props object. Uniforms adds 'model' to the props, which we use.
ProfessorReview.propTypes = {
  professor: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Contact documents.
  const subscription = Meteor.subscribe(Professors.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const professor = Professors.collection.findOne(documentId);
  return {
    professor,
    ready,
  };
})(ProfessorReview);
