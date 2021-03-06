import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Professors } from '../../api/professor/Professors';
import { Courses } from '../../api/course/Courses';
import { Reviews } from '../../api/review/Reviews';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.

Meteor.publish(Professors.userPublicationName, function () {
  if (this.userId) {
    return Professors.collection.find();
  }
  return this.ready();
});

Meteor.publish(Courses.userPublicationName, function () {
  if (this.userId) {
    return Courses.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    return Reviews.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.

Meteor.publish(Professors.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Professors.collection.find();
  }
  return this.ready();
});

Meteor.publish(Courses.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Courses.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
