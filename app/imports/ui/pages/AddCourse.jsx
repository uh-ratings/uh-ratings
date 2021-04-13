import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Course } from '../../api/course/Course';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  semester: String,
  classname: String,
  professor: String,
  ratings: Number,
  description: String,
  cost: Number,
  averagetime: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddCourse extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { semester, classname, professor, ratings, description, cost, averagetime } = data;
    const owner = Meteor.user().username;
    Course.collection.insert({ semester, classname, professor, ratings, description, cost, averagetime, owner },
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
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Add Course Review</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='semester'/>
              <TextField name='classname'/>
              <TextField name='professor'/>
              <NumField name='ratings' decimal={false}/>
              <LongTextField name='description'/>
              <NumField name='cost' decimal={false}/>
              <NumField name='averagetime' decimal={false}/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddCourse;
