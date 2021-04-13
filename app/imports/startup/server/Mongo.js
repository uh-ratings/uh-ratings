import { Meteor } from 'meteor/meteor';
import { Professors } from '../../api/professor/Professors';
import { Courses } from '../../api/course/Courses';

/* eslint-disable no-console */

// Initialize the database with a default data document.

function addProfessor(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Professors.collection.insert(data);
}

function addCourse(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Courses.collection.insert(data);
}

// Initialize the ProfessorsCollection if empty.
if (Professors.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfessors) {
    console.log('Creating default Professors.');
    Meteor.settings.defaultProfessors.map(data => addProfessor(data));
  }
}

if (Courses.collection.find().count() === 0) {
  if (Meteor.settings.defaultCourses) {
    console.log('Creating default Courses.');
    Meteor.settings.defaultCourses.map(data => addCourse(data));
  }
}
