const GitHubClient = require('./GitHubClient.js');

let githubCli = new GitHubClient({
  baseUri:"http://ghe.k33g/api/v3",
  token:process.env.TOKEN_GITHUB_ENTERPRISE
});

let githubCliDotCom = new GitHubClient({
  baseUri:"https://api.github.com",
  token:process.env.TOKEN_GITHUB_DOT_COM
});

console.log(githubCli.baseUri, githubCli.credentials); // http://ghe.k33g

// get user information
githubCli.getData({path:"/users/k33g"})
.then(response => {
  //console.log(response.headers);
  console.log(response.data);
})
.catch(error => {
  console.log("error", error)
})

// get user information
githubCliDotCom.getData({path:"/users/k33g"})
.then(response => {
  //console.log(response.headers);
  console.log(response.data);
})
.catch(error => {
  console.log("error", error)
})
