import { Meteor } from 'meteor/meteor';
import { Professors } from '../../api/professor/Professors';

/* eslint-disable no-console */

// Initialize the database with a default data document.

function addProfessor(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Professors.collection.insert(data);
}

// Initialize the ProfessorsCollection if empty.
if (Professors.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfessors) {
    console.log('Creating default Professors.');
    Meteor.settings.defaultProfessors.map(data => addProfessor(data));
  }
}
