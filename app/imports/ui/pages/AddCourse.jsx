import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Courses } from '../../api/course/Courses';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  semester: String,
  professor: String,
  description: String,
  cost: Number,
  averagetime: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddCourse extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, semester, professor, description, cost, averagetime } = data;
    const owner = Meteor.user().username;
    Courses.collection.insert({ name, semester, professor, description, cost, averagetime, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Course added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <div className='uhmanoa-addcourse-background' id='add-course'>
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Course Review</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField id='addcourse-name' name='name'>Course Name</TextField>
                <TextField id='addcourse-semester' name='semester'/>
                <TextField id='addcourse-professor' name='professor'/>
                <LongTextField id='addcourse-description' name='description'/>
                <NumField id='addcourse-cost' name='cost' decimal={false}/>
                <NumField id='addcourse-time' name='averagetime' decimal={false}/>
                <SubmitField id='addcourse-submit' value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AddCourse;
