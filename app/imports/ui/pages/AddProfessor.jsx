import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Professors } from '../../api/professor/Professors';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  address: String,
  image: String,
  description: String,
  course: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddProfessor extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, address, image, description, course } = data;
    const owner = Meteor.user().username;
    Professors.collection.insert({ firstName, lastName, address, image, description, course, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Professor added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <div id='add-professor'>
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Professor Review</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField id='addprofessor-firstname' name='firstName'/>
                <TextField id='addprofessor-lastname' name='lastName'/>
                <TextField id='addprofessor-address' name='address'/>
                <TextField id='addprofessor-image' name='image'/>
                <LongTextField id='addprofessor-description' name='description'/>
                <TextField id='addprofessor-course' name='course'/>
                <SubmitField id='addprofessor-submit' value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AddProfessor;
