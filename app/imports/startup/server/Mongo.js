import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts';
import { Course } from '../../api/course/Course';

/* eslint-disable no-console */

// Initialize the database with a default data document.

function addContact(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Contacts.collection.insert(data);
}

function addCourse(data) {
  console.log(`  Adding: ${data.semester} (${data.owner})`);
  Course.collection.insert(data);
}

// Initialize the ContactsCollection if empty.
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default Contacts.');
    Meteor.settings.defaultContacts.map(data => addContact(data));
  }
}

if (Course.collection.find().count() === 0) {
  if (Meteor.settings.defaultCourse) {
    console.log('Creating default Courses.');
    Meteor.settings.defaultCourse.map(data => addCourse(data));
  }
}
