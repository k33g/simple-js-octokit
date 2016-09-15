const GitHubClient = require('../GitHubClient.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

githubCli.createIssue({
  title:"Huston?",
  body:`## I've got a problem

  > this a WIP

  :octocat:
  `,
  labels: ["point: 21", "priority: high", "type: bug"],
  milestone: 1,
  assignees: ["k33g"],
  owner: 'UnitedFederationOfPlanets',
  repository: 'repo-00'
}).then(res => console.log(res.id, res.number));
