const GitHubClient = require('../GitHubClient.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

// get user information
githubCli.fetchUser({handle:'k33g'}).then(user => {
  console.log(user);
})
.catch(error => {
  console.log("error", error)
})
