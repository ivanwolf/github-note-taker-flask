var axios = require('axios');

function getRepos(username){
  return axios.get('https://api.github.com/users/' + username + '/repos');
};

function getUserInfo(username){
  return axios.get('https://api.github.com/users/' + username);
};

var helpers = {
  getGithubInfo: function(username){
    return axios.all([getRepos(username), getUserInfo(username)])
       .then(function(response){
         return {
           repos: response[0].data,
           bio: response[1].data
         }
       });
  },
  getNotes: function(username){
    return axios.get('http://localhost:5000/profile/' + username)
      .then(function(response){
        return{
          notes: response.data
        }
      });
  },
  addNote: function(username, text){
    return axios.get('http://localhost:5000/add_note', {
      params: {
        username: username,
        text: text
      }
    })
    .then(function(response){
      return{
        notes: response.data
      }
    });
  }
};

module.exports = helpers;
