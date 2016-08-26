const GitHubClient = require('../GitHubClient.js');

let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

githubCli.createPublicRepository({name:"toys", description:"my little repo"})
  .then(repo => {
    console.log(repo)
  })

githubCli.createPublicOrganizationRepository({name:"toys", description:"my little repo", organization:"ACME"})
  .then(repo => {
    console.log(repo)
  })

githubCli.createPublicOrganizationRepository({name:"repo-00", description:"TBD", organization:"UnitedFederationOfPlanets"})
  .then(repo => {
    console.log(repo)
  })

githubCli.createPublicOrganizationRepository({name:"repo-01", description:"TBD", organization:"UnitedFederationOfPlanets"})
  .then(repo => {
    console.log(repo)
  })

githubCli.createPublicOrganizationRepository({name:"repo-02", description:"TBD", organization:"UnitedFederationOfPlanets"})
  .then(repo => {
    console.log(repo)
  })
