const GitHubClient = require('../GitHubClient.js');

let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

// you need some users and at least an organization

githubCli.getTeamByName({
  org: 'UnitedFederationOfPlanets',
  name: 'USSEnterpriseCrew'
}).then(team => {
  console.log("team id: ",team.id)

  // Add members to team of an organization
  githubCli.addTeamMembership({
    teamId: team.id,
    userName: 'spocky',
    role: 'maintener'
  }).then(results=>console.log(results))

  githubCli.addTeamMembership({
    teamId: team.id,
    userName: 'jeanlouc',
    role: 'maintener'
  }).then(results=>console.log(results))

  githubCli.addTeamMembership({
    teamId: team.id,
    userName: 'k33g',
    role: 'maintener'
  }).then(results=>console.log(results))

}).catch(error => {
  console.log("error", error)
})
