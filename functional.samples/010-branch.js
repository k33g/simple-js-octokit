const Validation = require('./stools/Validation.js');
const Either = require('./stools/Either.js');

const GitHubClient = require('../GitHubClient.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

function createBranch() {
  return githubCli.createBranch({
      name: "wip-killer-feature-again-ping"
    , from: "master"
    , owner: "UnitedFederationOfPlanets"
    , repository: "repo-00"
  })
  .then(res => { return Either.Right(res) })
  .catch(error => { return Either.Left(`Error 😡:${error.message} ${error.status}`) })
}

createBranch().then(res => console.log(res.value))
