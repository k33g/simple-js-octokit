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

babs.addIssueComment({
    owner: 'UnitedFederationOfPlanets'
  , repository: 'repo-00'
  , number: 14
  , body: [
      "Hey @k33g :wave:!"
    , "It's a nice issue"
    , ":octocat: :heart:"
  ].join('\n')
})

buster.addIssueComment({
    owner: 'UnitedFederationOfPlanets'
  , repository: 'repo-00'
  , number: 14
  , body: [
      "Hey @babs:"
    , "### My tasks:"
    , "- [ ] Add specifications"
    , "- [ ] Add samples"
    , "- [ ] Add documentation"
    , "*A lot of thing to do* :warning:"
  ].join('\n')
})
