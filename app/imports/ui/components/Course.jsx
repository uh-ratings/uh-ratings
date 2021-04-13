import React from 'react';
import { Card, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Course extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>
            <Link to={`/course/${this.props.course._id}`}>
              {this.props.course.name}
            </Link>
          </Card.Header>
          <Card.Meta>Teach by {this.props.course.professor}</Card.Meta>
          <Card.Meta>Semester offered: {this.props.course.semester}</Card.Meta>
          <Card.Description>
            {this.props.course.description}
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
Course.propTypes = {
  course: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Course);
