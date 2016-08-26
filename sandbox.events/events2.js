const GitHubClient = require('../GitHubClient.js');

let githubCli = new GitHubClient({
  baseUri:"http://ghe.k33g/api/v3",
  token:process.env.TOKEN_GITHUB_ENTERPRISE
});


// List repository events
// GET /repos/:owner/:repo/events
// /networks/k33g/killing-repo/events
// /repos/k33g/killing-repo/events
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
      let lastEvent = response.data[0];
      console.log("id:", lastEvent.id, "type:", lastEvent.type);
      // PushEvent / Error when CreateEvent -> commits: undefined
      // PullRequestEvent
      // lastEvent.actor / lastEvent.repo / lastEvent.created_at

      if(lastEvent.type == "CreateEvent") {
        //console.log("==============================");
        //console.log(response.data)
      }

      if(lastEvent.type == "PullRequestEvent") {
        //console.log("==============================");
        //console.log(response.data) // first action == opened
      }

      if(lastEvent.type == "PushEvent") {
        //console.log("### lastEvent ###", lastEvent)

        let ref = lastEvent.payload.ref.split("refs/heads/")[1];
        console.log(">>> ref:", ref);

        console.log(">>> commits:", lastEvent.payload.commits);
        let firstCommit = lastEvent.payload.commits[0]

        //let handleNameOfCommitAuthor = firstCommit.author.name
        let handleNameOfCommitAuthor = lastEvent.actor.login;

        githubCli.getData({path:`/repos/${handleNameOfCommitAuthor}/killing-repo/commits/${firstCommit.sha}`})
        .then(response => {
          let filesOfCommit = response.data.files;
          console.log(">>> files:", filesOfCommit);

          let firstFile = filesOfCommit[0]; // do this for all files

          githubCli.getData({path:`/repos/${handleNameOfCommitAuthor}/killing-repo/contents/${firstFile.filename}?ref=${ref}`})
          .then(response => {
            console.log("==============================");
            let fileContent = response.data;
            console.log("path", fileContent.path, "type", fileContent.type, "encoding", fileContent.encoding);
            console.log("==============================");
            let srcFile = new Buffer(fileContent.content, fileContent.encoding).toString("ascii")
            console.log(srcFile)
            console.log("==============================");

            // TODO: check that's a md file -> firstFile.filename
            // Linter!!!

            // change the status of the PR
            githubCli.postData({
              path:`/repos/k33g/killing-repo/statuses/${firstCommit.sha}`, // firstCommit!!!
              data: {
                state: "failure", // pending success error failure
                description: "the blobs attaks the beach"
              }
            }).then(response => {
              console.log("+++++++++++++++++++++++++++++")
              console.log(response.data)
              console.log("+++++++++++++++++++++++++++++")

            })
            .catch(error => {
              console.log("|||>>> error:", error)
            })

          })
        })
      }

    }

  })
  .catch(error => {
    console.log(">>> error:", error)
  })
}

githubCli.getData({path:"/networks/k33g/killing-repo/events"}).then(response => {

  let delay = response.headers.get('X-Poll-Interval')
  console.log("delay:", delay * 1000)
  //setInterval(stuff, delay * 1000);
  setInterval(stuff, 4000);
})
