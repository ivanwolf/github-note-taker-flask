import axios from 'axios';

function getRepos(username){
  return axios.get(`https://api.github.com/users/${username}/repos`);
};

function getUserInfo(username){
  return axios.get(`https://api.github.com/users/${username}`);
};

const helpers = {
  getGithubInfo(username){
    return axios.all([getRepos(username), getUserInfo(username)])
       .then((response) => ({repos: response[0].data, bio: response[1].data}));
  },
  getNotes(username){
    return axios.get(`http://localhost:5000/profile/${username}`)
      .then((response) => ({notes: response.data}));
  },
  addNote(username, text){
    console.log(username, text)
    return axios.get('http://localhost:5000/add_note', {
      params: {
        username: username,
        text: text
      }
    })
    .then((response) => ({notes: response.data}));
  }
};

export default helpers;
