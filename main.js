const GitHubClient = require('./GitHubClient.js');

let githubCli = new GitHubClient({
  host:"ghe.k33g", port:-1, scheme:"http", token:process.env.TOKEN_GITHUB_ENTERPRISE
});

let githubCliDotCom = new GitHubClient({
  host:"api.github.com", port:-1, scheme:"https", token:process.env.TOKEN_GITHUB_DOT_COM
});

console.log(githubCli.baseUri, githubCli.credentials); // http://ghe.k33g
console.log("->", githubCli.uri({path:"/users/k33g"}))

// get user information
githubCli.getData({path:"/users/k33g"})
.then(json => console.log(json))
.catch(error => {
  console.log("error", error)
})

// get user information
githubCliDotCom.getData({path:"/users/k33g"})
.then(json => console.log(json))
.catch(error => {
  console.log("error", error)
})
