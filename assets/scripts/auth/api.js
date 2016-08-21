'use strict';

const app = require('../app');
// const api = require('../api');


const signIn = (data) => $.ajax({
  url: app.api + '/sign-in',
  method: 'POST',
  data,
});



const changePassword = (data) => $.ajax({
  url: app.api + '/change-password/' + app.user.id,
  method: 'PATCH',
  data,
  headers: {
    Authorization: 'Token token=' + app.user.token,
  }
});


const signUp = (data) => $.ajax({
    url: app.api + '/sign-up',
    method: 'POST',
    data,
   });



const signOut = () => $.ajax({
  url: app.api + '/sign-out/' + app.user.id,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  }
});

const createJob = (success, failure, data) => {
  $.ajax({
    method: "POST",
    url: app.api + '/jobs',
    data,
    headers: {
      Authorization: 'Token token=' + app.user.token
    },
  })
  .done(success)
  .fail(failure);
};




const getJobs = (success, failure) => {
  return $.ajax({
    url: app.api + '/jobs',
     dataType: 'json',
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  })
  .done(success)
  .fail(failure);
};


const updateJob = (success, failure, data, id) => {

  $.ajax({
    method: "PATCH",
    url: app.api + '/jobs/' + id,
    headers: {
      Authorization: 'Token token='+ app.user.token,
    },
    data,
  })
  .done(success)
  .fail(failure);

};


const deleteJob = (success, failure, id) => {
    $.ajax({
      url: app.api + '/jobs/' + id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
    })
    .done(success)
    .fail(failure);
  };





module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  createJob,
  updateJob,
  getJobs,
  app,
  deleteJob

};
