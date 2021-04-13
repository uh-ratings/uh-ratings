import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Admin extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.professor.image}
          />
          <Card.Header>{this.props.professor.firstName} {this.props.professor.lastName}</Card.Header>
          <Card.Meta>{this.props.professor.address}</Card.Meta>
          <Card.Description>
            {this.props.professor.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {this.props.professor.owner}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Admin.propTypes = {
  professor: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Admin);
