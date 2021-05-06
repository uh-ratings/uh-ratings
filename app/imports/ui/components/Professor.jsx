import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Professor extends React.Component {
  render() {
    const revArr = this.props.reviews;
    let rate;
    if (revArr.length !== 0) {
      const total = revArr.reduce((a, b) => ({ rating: a.rating + b.rating }));
      rate = total.rating / revArr.length;
    } else {
      rate = 3;
    }
    return (
      <Card centered>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.professor.image}
          />
          <Card.Header id='professor-name'>
            <Link id='addprofessorreview-temp' to={`/professor/${this.props.professor._id}`}>
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
          <Rating disabled icon='star' defaultRating={rate} maxRating={5}/>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Professor.propTypes = {
  professor: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Professor);
