//"use strict";
const fetch = require('node-fetch');
// https://github.com/bitinn/node-fetch
// npm install node-fetch --save

class GitHubClient {
  constructor({baseUri, token}) {
    this.baseUri = baseUri
    this.credentials = token !== null && token.length > 0 ? "token" + ' ' + token : null
    this.headers = {
      "Content-Type": "application/json",
      "Accept": "application/vnd.github.v3.full+json",
      "Authorization": this.credentials
    }
  }

  getData({path}) {
    let _response = {}
    return fetch(this.baseUri + path, {
      method: 'GET',
      headers: this.headers
    })
    .then(response => {
      // save reference of response / then we can access to headers
      _response = response
      // if response is ok transform response.text to json object
      return response.ok ? response.json() : null;
    })
    .then(jsonData => {
      // add json data to _response
      _response.data = jsonData;
      return _response;
    })
  }

  postData({path, data}) {
    let _response = {}
    return fetch(this.baseUri + path, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    })
    .then(response => {
      _response = response
      return response.ok ? response.json() : null;
    })
    .then(jsonData => {
      _response.data = jsonData;
      return _response;
    })
  }

  // get user data
  fetchUser({handle}) {
    return this.getData({path:`/users/${handle}`})
    .then(response => {
      return response.data;
    });
  }
  /*
    Repositories
    TODO:
    - fetch, delete, update
    - refactoring
  */
  createPublicRepository({name, description}) {
    return this.postData({path:`/user/repos`, data:{
      name: name,
      description: description,
      private: false,
      has_issue: true,
      has_wiki: true,
      auto_init: true
    }}).then(response => {
      return response.data;
    });
  }

  createPrivateRepository({name, description}) {
    return this.postData({path:`/user/repos`, data:{
      name: name,
      description: description,
      private: true,
      has_issue: true,
      has_wiki: true,
      auto_init: true
    }}).then(response => {
      return response.data;
    });
  }

  createPublicOrganizationRepository({name, description, organization}) {
    return this.postData({path:`/orgs/${organization}/repos`, data:{
      name: name,
      description: description,
      private: false,
      has_issue: true,
      has_wiki: true,
      auto_init: true
    }}).then(response => {
      return response.data;
    });
  }

  createPrivateOrganizationRepository({name, description, organization}) {
    return this.postData({path:`/orgs/${organization}/repos`, data:{
      name: name,
      description: description,
      private: true,
      has_issue: true,
      has_wiki: true,
      auto_init: true
    }}).then(response => {
      return response.data;
    });
  }


}


module.exports = GitHubClient
