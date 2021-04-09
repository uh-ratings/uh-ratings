import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Professor extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.professor.image}
          />
          <Card.Header>
            <Link to={`/edit/${this.props.professor._id}`}>
              {this.props.professor.firstName} {this.props.professor.lastName}
            </Link>
          </Card.Header>
          <Card.Meta>{this.props.professor.address}</Card.Meta>
          <Card.Description>
            {this.props.professor.description}
          </Card.Description>
          <Card.Description>
            <strong> Course Teaching: {this.props.professor.course} </strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Rating disabled icon='star' defaultRating={3} maxRating={5}/>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Professor.propTypes = {
  professor: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Professor);
