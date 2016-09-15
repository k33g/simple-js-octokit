const GitHubClient = require('../GitHubClient.js').GitHubClient;

let k33g = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

k33g.fetchIssue({owner: 'UnitedFederationOfPlanets', repository: 'repo-00', number: 14})
  .then(issue => {
    console.log(issue.id, issue.title, issue.state)
    console.log("by:", issue.user.login)
    console.log(issue.body)
  })
