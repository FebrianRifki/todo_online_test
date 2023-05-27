const activitesRoute = require('express').Router();
const { activity } = require('../controllers');

// Display all activity data
activitesRoute.get('/activity-groups', activity.getAllActivity);

// Display one activity data
activitesRoute.get('/activity-groups/:id', activity.findOneData)

// Create an activity data
activitesRoute.post('/activity-groups', activity.createActivity);

// Update activity data
activitesRoute.patch('/activity-groups/:id', activity.updateActivity);

// Delete activity data
activitesRoute.delete('/activity-groups/:id', activity.deleteActivity);

module.exports = activitesRoute;