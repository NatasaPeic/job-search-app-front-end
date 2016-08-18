'use strict';

const app = require('../app');
const api = require('./api');
// const ui = require('./ui');




// changed Password
const success = (data) => {
  console.log(data);
  console.log("Password was succesfully changed!");
  $( '#change-password' ).each(function(){
    this.reset();
  });

};


let displayJobs = function(jobs){
  // debugger;
  let jobListingTemplate = require('../template/jobs.handlebars');
   $('.table').empty();
  $('.table').append(jobListingTemplate({

  // debugger;
    jobs
  }));

};




const showJobsSuccess = (data) => {
  app.jobs = data.jobs;
  // app.contacts.forEach(formatDate);
  displayJobs(data);
  console.log(app.jobs);
};

// Error message
const failure = (error) => {
  console.error(error);
};


const failureSignIn = () => {
  console.log("Wrong Password!");
  $('#createJob, #updateJob, #deleteJob, #change-password-modal-link, #sign-out-modal-link, .content, #create-job-modal-link ').hide();
  $('.business-header, .img-square, h2, p, hr').show();

  $('#sign-up-modal-link, #sign-in-modal-link ').show();
  $('.business-header, .img-square, h2, p, hr, #sign-up-modal-link, #sign-in-modal-link').show();

  // alert("Wrong passowrd");
};



// Sign up
const onSuccess = function (data) {
  app.user = data.user;
console.log(data);
console.log(app.user);
console.log("Sign up was successful!");
};



// Sign in
const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app);
  console.log("Sign in was successful!");

  $('#sign-in' ).each(function(){
  this.reset();
});

  api.getJobs(showJobsSuccess, failure);

};


// Sign out
const signOutSuccess = () => {
  // debugger;
  console.log('You sign out succesfully!');
  delete app.user;


};





//UI the handles succesfully creating a job
const createJobSuccess = (data) => {
  console.log(data);
  console.log("Job is created!");
  // $('#create-job-modal').modal('hide');
  // $(".modal-backdrop").hide();
  $( '#create-job' ).each(function(){
    this.reset();
  });
  api.getJobs(showJobsSuccess, failure);


};



const updateJobSuccess = (data) => {
  console.log(data);
  console.log("Job was updated!");
  ///need to render contacts table because of async -- crazy
  // $('#update-job-modal').modal('hide');
  // $(".modal-backdrop").hide();
  $( '#update-job' ).each(function(){
    this.reset();
  });
  api.getJobs(showJobsSuccess, failure);
};



const deleteJobSuccess = (data) => {
  console.log(data);
  console.log("Job is deleted!");
  displayJobs();
  // $('#delete-job-modal').modal('hide');
  // $(".modal-backdrop").hide();
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
