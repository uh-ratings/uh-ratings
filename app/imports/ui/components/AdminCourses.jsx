import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AdminCourses extends React.Component {
  removeItem(docID) {
    this.props.Courses.collection.remove(docID);
  }

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>{this.props.course.name}</Card.Header>
          <Card.Meta>{this.props.course.professor} {this.props.course.semester}</Card.Meta>
          <Card.Description>
            {this.props.course.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          Cost: {this.props.course.cost}
        </Card.Content>
        <Card.Content extra>
        Time: {this.props.course.averagetime}
        </Card.Content>
        <Card.Content extra>
          <Button icon onClick={ () => this.removeItem(this.props.course._id)}>
            <Icon name='trash' />
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
AdminCourses.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    cost: PropTypes.number,
    semester: PropTypes.string,
    description: PropTypes.string,
    professor: PropTypes.string,
    averagetime: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  Courses: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(AdminCourses);
