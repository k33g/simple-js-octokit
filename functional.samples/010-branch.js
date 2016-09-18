#!/usr/bin/env node

const GitHubClient = require('../GitHubClient.js').GitHubClient;

function createBranchThenFileAndPullRequest() {

  let githubCli = new GitHubClient({
    baseUri:"http://github.at.home/api/v3",
    token:process.env.TOKEN_GHE_27_K33G
  });

  let optionsBranch = {
      branch: "wip-killer-feature-600"
    , from: "master"
    , owner: "UnitedFederationOfPlanets"
    , repository: "repo-00"
  }

  let optionsFile = Object.assign({
      file:"docs/hello-earth-05.md"
    , message: "my hello world file :octocat:"
    , content:[
        '# Hello World!'
      , '> WIP'
      , 'this is a test'
      , '## And ...'
      , '*to be continued* ...'
    ].join('\n')
  }, optionsBranch);
  //delete optionsFile.from -> not mandatory

  let optionsPR = {
      title: "!!!Hey, I've a great idea!"
    , body: "It's amazing!"
    , head: optionsBranch.branch
    , base: optionsBranch.from
    , owner: optionsBranch.owner
    , repository: optionsBranch.repository
  }

  githubCli.createBranch(optionsBranch)
  .then(res => {
    console.log("BRANCH OK")
    githubCli.createFile(optionsFile)
    .then(res => {
      console.log("FILE OK")
      githubCli.createPullRequest(optionsPR)
      .then(res => {
        console.log("PR OK")
      })
      .catch(error => {
        console.log("PR KO")
      })
    })
    .catch(error => {
      console.log("FILE KO")
    })
  })
  .catch(error => {
    console.log("BRANCH KO")
  })

}

createBranchThenFileAndPullRequest()
