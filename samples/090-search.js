const GitHubClient = require('../GitHubClient.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

githubCli.searchCode({q:'incrementOf1+in:file'}).then(result => {
  console.log(result.total_count, result.incomplete_results)
  console.log(result)
})
.catch(error => {
  console.log("error", error)
})
