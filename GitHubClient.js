//"use strict";
const fetch = require('node-fetch');
// https://github.com/bitinn/node-fetch
// npm install node-fetch --save

class GitHubClient {
  constructor({host, port, scheme, token}) {
    this.prefix = host == "api.github.com" ? null : "/api/v3";
    this.baseUri = port > 0 ? scheme + "://" + host + port : scheme + "://" + host
    this.credentials = token !== null && token.length > 0 ? "token" + ' ' + token : null

    this.headers = {
      "Content-Type": "application/json",
      "Accept": "application/vnd.github.v3.full+json",
      "Authorization": this.credentials
    }
    // "User-Agent": "GitHubSimpleJS/1.0.0",

  }

  uri({path}) {
    return this.baseUri + (this.prefix == null || path.startsWith(this.prefix) ? path : this.prefix + path);
  }

  getData({path}) {
    return fetch(this.uri({path:path}), {
      method: 'GET',
      headers: this. headers
    }).then(response => {
      return response.json();
    })
  }

  postData({path, data}) {
    return fetch(this.uri({path:path}), {
      method: 'POST',
      headers: this. headers,
      body: JSON.stringify(data)
    }).then(response => {
      return response.json();
    })
  }

}


module.exports = GitHubClient
