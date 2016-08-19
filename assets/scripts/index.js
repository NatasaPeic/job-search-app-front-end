'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');


// const authEvents = require('./events.js');
const authEvents = require('./auth/events.js');
// const app = require('./app');
// const api = require('./auth/api');




// on document ready
$(() => {
  authEvents.addHandlers();


 $('#createJob, #updateJob, #deleteJob, #change-password-modal-link, #change-password-modal-link, #sign-out-modal-link, .content, #create-job-modal-link, #update-job-modal-link, #sign-in-modal-link').hide();


});
