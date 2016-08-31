const GitHubClient = require('../GitHubClient.js');

let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

// you need some users and at least an organization

githubCli.createTeam({
  org: 'UnitedFederationOfPlanets',
  name: 'USSEnterpriseCrew',
  description: 'the dream team',
  repo_names:[
    'UnitedFederationOfPlanets/repo-00',
    'UnitedFederationOfPlanets/repo-01',
    'UnitedFederationOfPlanets/repo-02'
  ],
  privacy: 'closed',
  permission:'admin'
}).then(team => {
  console.log(team)
}).catch(error => {
  console.log("error", error)
})
