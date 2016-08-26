const GitHubClient = require('../GitHubClient.js');

let githubCli = new GitHubClient({
  baseUri:"http://ghe.k33g/api/v3",
  token:process.env.TOKEN_GITHUB_ENTERPRISE
});


// List repository events
// GET /repos/:owner/:repo/events
// GET /repos/:owner/:repo/issues/events
//GET /networks/:owner/:repo/events

let stuff = () => {
  githubCli.getData({path:"/networks/k33g/killing-repo/events"})
  .then(response => {

    githubCli.headers["If-None-Match"] = response.headers.get('etag')

    //console.log(response.status, response.ok)


    if(response.status == 200) {
      console.log("---------------")
      console.log("  Hey!")
      console.log("---------------")

      // last event
      //let lastEvent = response.data[0];
      //console.log("id:", lastEvent.id, "type:", lastEvent.type);
      // PushEvent / Error when CreateEvent -> commits: undefined
      // PullRequestEvent
      // lastEvent.actor / lastEvent.repo / lastEvent.created_at
      console.log(response.data[0])

    }

  })
  .catch(error => {
    console.log(">>> error:", error)
  })
}

setInterval(stuff, 4000);
