const GitHubClient = require('../GitHubClient.js').GitHubClient;

let k33g = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});
/*
let babs = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_BABS
});

let buster = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_BUSTER
});


babs.createIssue({
  title:"Babs?",
  body:`## Babs Issue

  > this a WIP

  :octocat:
  `,
  labels: ["point: 21", "priority: high", "type: bug"],
  milestone: 2,
  assignees: ["k33g"],
  owner: 'UnitedFederationOfPlanets',
  repository: 'repo-00'
}).then(res => console.log(res.id, res.number));

buster.createIssue({
  title:"Buster Issue?",
  body:`## Buster Issue

  > this a WIP

  :octocat:
  `,
  labels: ["point: 21", "priority: high", "type: bug"],
  milestone: 2,
  assignees: ["k33g"],
  owner: 'UnitedFederationOfPlanets',
  repository: 'repo-00'
}).then(res => console.log(res.id, res.number));
*/
k33g.fetchIssues({owner: 'UnitedFederationOfPlanets', repository: 'repo-00'})
  .then(issues => {
    issues.forEach(issue => console.log(issue.id, issue.number, issue.title))
  })
