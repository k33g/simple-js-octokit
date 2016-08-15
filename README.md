# simple-js-octokit

## What

> TODO

## Install

> TODO

## Use

> WIP

### Set token(s)

> WIP
- create a personal web token on your GitHub profile
- set a environment variable with the token, eg:

```
export TOKEN_GITHUB_DOT_COM=<YOUR_TOKEN>
export TOKEN_GITHUB_ENTERPRISE=<YOUR_TOKEN>
```

### Initialize GitHub client

```javascript
const GitHubClient = require('./GitHubClient.js');

// GitHubClient to connect to GitHub Enterprise
let githubCli = new GitHubClient({
  host:"ghe.k33g", port:-1, scheme:"http", token:process.env.TOKEN_GITHUB_ENTERPRISE
});

// GitHubClient to connect to GitHub.com
let githubCliDotCom = new GitHubClient({
  host:"api.github.com", port:-1, scheme:"https", token:process.env.TOKEN_GITHUB_DOT_COM
});
```


### Get user informations

```javascript
// get user information
githubCli.getData({path:"/users/k33g"})
.then(json => console.log(json))
.catch(error => {
  console.log("error", error)
})

```

### Create a repository

```javascript
// create a repository
githubCli.postData({path:"/user/repos", data:{
  name: "killing-repo",
  description: "my killing repository",
  private: false,
  has_issues: true,
  auto_init: true
}})
.then(json => console.log(json))
.catch(error => {
  console.log("error", error)
})
```
