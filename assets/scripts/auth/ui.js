'use strict';

const app = require('../app');
const api = require('./api');




// change password
const success = (data) => {
  console.log(data);
  console.log("Password was succesfully changed!");
  $( '#change-password' ).each(function(){
    this.reset();
  });
};


// handlebars
let displayJobs = function(jobs){
  // debugger;
  let jobListingTemplate = require('../template/jobs.handlebars');

  // remove all the content table
   $('.table').empty();
  // append content from GET request using handlebars
  $('.table').append(jobListingTemplate({

  // debugger;
    jobs
  }));
};



// GET request, show data on the front end
const showJobsSuccess = (data) => {

  app.jobs = data.jobs;

  displayJobs(data);
  console.log(app.jobs);
};



// Error modal for taken email
const failure = (error) => {
  console.error(error);

  $('#taken-password').modal('show');


  $('#modalClose1').on('click', function () {


  $('#taken-password').modal('hide');
  $(".modal-backdrop").hide();
  $('#sign-up-modal-link').show();
  $('#sign-in-modal-link').hide();
});

$('#sign-up' ).each(function(){
this.reset();
});

};


// Error modal for wrong password
const failureSignIn = () => {
  console.log("Wrong Password!");

  $('#wrong-password').modal('show');


  $('#modalClose').on('click', function () {


  $('#wrong-password').modal('hide');
  $(".modal-backdrop").hide();
  $('#sign-up-modal-link').show();
  $('#sign-in-modal-link').show();
});


  $('#createJob, #updateJob, #deleteJob, #change-password-modal-link, #sign-out-modal-link, .content, #create-job-modal-link, #sign-in-modal-link, #update-job-modal-link').hide();
  $('.business-header, .img-square, h2, p, hr').show();

  $('#sign-up-modal-link, #sign-in-modal-link ').show();
  $('.business-header, .img-square, h2, p, hr, #sign-in-modal-link').show();



  // alert("Wrong passowrd");
  // reset form fields
  $('#sign-in' ).each(function(){
  this.reset();


});
};



// Sign up
const onSuccess = function (data) {
  app.user = data.user;
console.log(data);
console.log("Sign up was successful!");

$('#sign-up-job-modal').modal('hide');
$(".modal-backdrop").hide();

$('#sign-in-modal-link').show();
$('#sign-up-modal-link').hide();

// reset form fields
$('#sign-up' ).each(function(){
this.reset();
});

};



// Sign in
const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app.user);
  console.log("User is signed in!");



    $('#sign-in-job-modal').modal('hide');
    $(".modal-backdrop").hide();

    $('#sign-in-modal-link, #update-job-modal-link').hide();
    // before refactoring
    // $('#c-job-modal-link, #table').show();

    $('#change-password-modal-link, sign-out-modal-link').show();


  // reset form fields
  $('#sign-in' ).each(function(){
  this.reset();
});
  // fire ajax if sign in was successful to show jobs on the front end
  api.getJobs(showJobsSuccess, failure);

};


// Sign out
const signOutSuccess = () => {


  console.log('You signed out succesfully!');
  delete app.user;

  $('#createJob, #updateJob, #deleteJob, #change-password-modal-link, #sign-out-modal-link, .content ').hide();
  $('.business-header, .img-square, h2, p, hr').show();

  $('#sign-up-modal-link, #sign-in-modal-link ').show();
  $('.business-header, .img-square, h2, p, hr, #sign-up-modal-link, #sign-in-modal-link').show();


};





//UI the handles succesfully creating a job
const createJobSuccess = (data) => {
  console.log(data);
  console.log("Job is created!");

  $('#create-job-modal').modal('hide');
  $(".modal-backdrop").hide();

  $( '#create-job' ).each(function(){
    this.reset();
  });
  api.getJobs(showJobsSuccess, failure);


};


// update
const updateJobSuccess = (data) => {
  console.log(data);
  console.log("Job was updated!");


   // reset form fields
  $( '#update-job' ).each(function(){
    this.reset();
  });

  // fire ajax if update was successful and show jobs on the front end
  api.getJobs(showJobsSuccess, failure);
};


// delete
const deleteJobSuccess = (data) => {
  console.log(data);
  console.log("Job is deleted!");

  displayJobs();

  // reset form fields

  $('#delete-job' ).each(function(){
  this.reset();
  });

  // fire ajax if delete was successful and delete if on the front end
  api.getJobs(showJobsSuccess, failure);
};



module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  onSuccess,
  createJobSuccess,
  updateJobSuccess,
  app,
  failureSignIn,
  deleteJobSuccess

};
