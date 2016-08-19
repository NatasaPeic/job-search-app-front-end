'use strict';


const getFormFields = require(`../../../lib/get-form-fields`);


const api = require('./api');
const ui = require('./ui');
// const jobAPI = require('./job_api.js');
// const jobUI = require('./job_ui.js');




// Sign up
const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(this);

   api.signUp(data)
   .done(ui.onSuccess)
   .fail(ui.failure);
};

const showSignUpModal = function showSignUpModal(){
  $('#sign-up-modal').modal('show');
};

const closeModalSignUp = function closeModalSignUp() {
    $('#sign-up-modal').modal('hide');
};




// Sign in
const showSignInModal = function showSignInModal(){
  $('#sign-in-modal').modal('show');
};

const closeModalSignIn = function closeModalSignIn() {
    $('#sign-in-modal').modal('hide');
};


const onSignIn = function (event) {

  let data = getFormFields(this);
  event.preventDefault();


  api.signIn(data)
   .done(ui.signInSuccess)
   .fail(ui.failureSignIn);

    $('#createJob, #updateJob, #deleteJob, #change-password-modal-link, #sign-out-modal-link, .content, #create-job-modal-link,  #update-job-modal-link').show();
    $('.business-header, .img-square, h2, p, hr').hide();

    $('#sign-up-modal-link, #sign-in-modal-link ').hide();
    $('.business-header, .img-square, h2, p, hr, #sign-up-modal-link, #sign-in-modal-link').hide();
};




// Change passowrd
const showChangePasswordModal = function showChangePasswordModal(){
  $('#change-password-modal').modal('show');
};

const closeModalChangePassword = function closeModalChangePassword() {
    $('#change-password-modal').modal('hide');
};

const onChangePassword = function(event) {

  event.preventDefault();
  let data = getFormFields(this);

    api.changePassword(data)
    .done(ui.success)
    .fail(ui.failure);

};



// Sign out
const showSignOutModal = function showSignOutModal(){
  $('#sign-out-modal').modal('show');
};

const closeModalSignOut = function closeModalSignOut() {
    $('#sign-out-modal').modal('hide');
};


const onSignOut = function (event) {

    event.preventDefault();

    api.signOut()
   .done(ui.signOutSuccess)
   .fail(ui.failure);


};




// create job
const showCreateJobModal = function showCreateJobModal(){
  $('#create-job-modal').modal('show');
};

const closeCreateJobModal = function closeCreateJobModal() {
    $('#create-job-modal').modal('hide');
};

const onCreateJobs = function(event) {
  event.preventDefault();

  let data = getFormFields(this);
  // debugger;

    api.createJob(ui.createJobSuccess, ui.failure, data);

};









const addHandlers = () => {


    $('#sign-up-modal-link').on('click', showSignUpModal);
    $('#sign-up').on('submit', onSignUp);
    $('#sign-up1').on('click', closeModalSignUp);

    $('#sign-in-modal-link').on('click', showSignInModal);
    $('#sign-in').on('submit', onSignIn);
    $('#sign-in1').on('click', closeModalSignIn);

    $('#change-password-modal-link').on('click', showChangePasswordModal);
    $('#change-password').on('submit', onChangePassword);
    $('#change-password1').on('click', closeModalChangePassword);




    $('#sign-out-modal-link').on('click', showSignOutModal);
    $('#sign-out').on('submit', onSignOut);
    $('#sign-out1').on('click', closeModalSignOut);

    $("#sign-out1").on('click', function () {
          $('#table, #create-job-modal-link').hide();

            location.reload();

    });

    $('#create-job-modal-link').on('click', showCreateJobModal);
    $('#create-job').on('submit', onCreateJobs);
    $('#createJob1').on('click', closeCreateJobModal);



    //updates the specific job once a submission event occurs
  $('#update-job').on('submit', function (event) {
    event.preventDefault();
    let id = $(".update-job-btn").attr("data-job-id");
    let data = getFormFields(this);
    // debugger;
    api.updateJob(ui.updateJobSuccess, ui.failure, data, id);
  });

  //adds a job id to the submit button
  $('.table').on('click', '.update-job', function(event){
    event.preventDefault();
    let id = $(event.target).attr("data-job-id");
    $(".update-job-btn").attr("data-job-id", id);
});




$('.delete-job-btn').on('click', function (event) {
   event.preventDefault();
   let id = $(this).attr("data-job-id");
   api.deleteJob(ui.deleteJobSuccess, ui.failure, id);
 });

//adds a contact id to the submit button
$('.table').on('click', '.delete-job', function(event){
event.preventDefault();
let id = $(event.target).attr("data-job-id");
$(".delete-job-btn").attr("data-job-id", id);
});




};








module.exports = {
  addHandlers,
};
