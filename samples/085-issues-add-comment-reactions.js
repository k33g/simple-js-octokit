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

k33g.fetchIssue({owner: 'UnitedFederationOfPlanets', repository: 'repo-00', number: 14})
  .then(issue => {
    console.log(issue.id, issue.title, issue.state)
    console.log("by:", issue.user.login)
    //console.log(issue.body)
    k33g.fetchIssueComments({owner: 'UnitedFederationOfPlanets', repository: 'repo-00', number: 14})
    .then(comments => {
      comments.forEach(comment => console.log(comment.id))
      // add reaction on the first comment
      k33g.addIssueCommentReaction({
          owner: 'UnitedFederationOfPlanets'
        , repository: 'repo-00'
        , id: comments[0].id
        , content: "heart"
      })
      babs.addIssueCommentReaction({
          owner: 'UnitedFederationOfPlanets'
        , repository: 'repo-00'
        , id: comments[0].id
        , content: "laugh"
      })
      buster.addIssueCommentReaction({
          owner: 'UnitedFederationOfPlanets'
        , repository: 'repo-00'
        , id: comments[0].id
        , content: "+1"
      })
    })

  })
