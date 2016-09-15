const GitHubClient = require('../GitHubClient.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

// only for GitHub Enterprise
githubCli.createOrganization({
  login:'UnitedFederationOfPlanets', // organization is like a user
  admin:'k33g',
  profile_name:'United Federation of Planets'
}).then(orga => {
  console.log(orga)
})
