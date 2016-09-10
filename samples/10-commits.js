const GitHubClient = require('../GitHubClient.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

githubCli.fetchCommitBySHA({
  sha: 'eeea1146097de8479bd6bdf8c2102f52198f16dd',
  owner: 'k33g',
  repository: 'stools'
})
.then(data => {
  console.log(data)
})
.catch(err => {
  console.error(err)
})
