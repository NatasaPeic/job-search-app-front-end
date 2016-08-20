'use strict';

const app = require('../app');
const api = require('./api');




// Change password
const success = (data) => {
  console.log(data);
  console.log("Password was succesfully changed!");
  $( '#change-password' ).each(function(){
    this.reset();
  });
};


// Append jobs from the back end using handlebars
let displayJobs = function(jobs){
  // debugger;
  let jobListingTemplate = require('../template/jobs.handlebars');

  // remove all the content table, so you don't get your backend info twice
   $('.table').empty();
  // change context in table, all
  $('.table').append(jobListingTemplate({

  // debugger;
    jobs
  }));

};




const showJobsSuccess = (data) => {

  app.jobs = data.jobs;

  displayJobs(data);
  console.log(app.jobs);
};



// Error message
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


const failureSignIn = () => {
  console.log("Wrong Password!");

  $('#wrong-password').modal('show');


  $('#modalClose').on('click', function () {


  $('#wrong-password').modal('hide');
  $(".modal-backdrop").hide();
  $('#sign-up-modal-link').show();
  $('#sign-in-modal-link').show();
});


  $('#createJob, #updateJob, #deleteJob, #change-password-modal-link, #sign-out-modal-link, .content, #create-job-modal-link, #sign-in-modal-link').hide();
  $('.business-header, .img-square, h2, p, hr').show();

  $('#sign-up-modal-link, #sign-in-modal-link ').show();
  $('.business-header, .img-square, h2, p, hr, #sign-in-modal-link').show();



  // alert("Wrong passowrd");
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

    $('#sign-in-modal-link').hide();
      $('#c-job-modal-link').show();




  // reset form, so you don't get the same date next time you want to sign in
  $('#sign-in' ).each(function(){
  this.reset();
});

  api.getJobs(showJobsSuccess, failure);

};


// Sign out
const signOutSuccess = () => {

  // $('.table').html('');
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



const updateJobSuccess = (data) => {
  console.log(data);
  console.log("Job was updated!");



  $( '#update-job' ).each(function(){
    this.reset();
  });
  api.getJobs(showJobsSuccess, failure);
};



const deleteJobSuccess = (data) => {
  console.log(data);
  console.log("Job is deleted!");
  displayJobs();

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
