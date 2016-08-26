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

  putData({path, data}) {
    let _response = {}
    return fetch(this.baseUri + path, {
      method: 'PUT',
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

  /* Organizations
    ### Organization Administration

    #### Create an organization:

      - only for GitHub Enterprise
      - `POST /admin/organizations`
      - see https://developer.github.com/v3/enterprise/orgs/#create-an-organization

      ```
      login	string	Required. The organization's username.
      admin	string	Required. The login of the user who will manage this organization.
      profile_name	string	The organization's display name.
      ```
    TODO:
    https://developer.github.com/v3/orgs/

  */
  createOrganization({login, admin, profile_name}) {
    return this.postData({path:`/admin/organizations`, data:{
      login: login,
      admin: admin,
      profile_name: profile_name
    }}).then(response => {
      return response.data;
    });
  }

  /* Teams
    ### Teams

    #### Create a Team

    See https://developer.github.com/v3/orgs/teams/#create-team
    POST /orgs/:org/teams

    :warning: In order to create a team, the authenticated user must be a member of :org.
    -> or you have to be the administrator

  */
  createTeam({org, name, description, repo_names, privacy, permission}) {
    return this.postData({path:`/orgs/${org}/teams`, data:{
      name: name,
      description: description,
      repo_names: repo_names,
      privacy: privacy, // secret or closed
      permission: permission // pull, push, admin
    }}).then(response => {
      return response.data;
    });
  }
  // list of the teams of the organization
  // See https://developer.github.com/v3/orgs/teams/#list-teams
  fetchTeams({org}) {
    return this.getData({path:`/orgs/${org}/teams`})
    .then(response => {
      return response.data;
    });
  }

  getTeamByName({org, name}) {
    return this.fetchTeams({org:org})
    .then(teams => {
      return teams.find(team => {
        return team.name = name
      })
    })
  }

  // Add team membership
  // PUT /teams/:id/memberships/:username
  addTeamMembership({teamId, userName, role}) {
    return this.putData({path:`/teams/${teamId}/memberships/${userName}`, data:{
      role: role // member, maintener
    }}).then(response => {
      return response.data;
    });
  }

}


module.exports = GitHubClient
