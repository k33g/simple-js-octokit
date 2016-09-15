const GitHubClient = require('../GitHubClient.js').GitHubClient;

let k33g = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

let babs = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_BABS
});

let buster = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_BUSTER
});

babs.addIssueReaction({
    owner: 'UnitedFederationOfPlanets'
  , repository: 'repo-00'
  , number: 14
  , content: "heart"
})
.then(res => console.log(res))
.catch(err => console.log("err", err))

babs.addIssueReaction({
    owner: 'UnitedFederationOfPlanets'
  , repository: 'repo-00'
  , number: 14
  , content: "hooray"
})
.then(res => console.log(res))
.catch(err => console.log("err", err))
