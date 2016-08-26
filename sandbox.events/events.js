const GitHubClient = require('../GitHubClient.js');

let githubCli = new GitHubClient({
  baseUri:"http://ghe.k33g/api/v3",
  token:process.env.TOKEN_GITHUB_ENTERPRISE
});

// List repository events
// GET /repos/:owner/:repo/events

setInterval(() => {
  githubCli.getData({path:"/repos/k33g/killing-repo/events"})
  .then(response => {

    githubCli.headers["If-None-Match"] = response.headers.get('etag')
    console.log(response.status, response.ok)

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
        console.log("==============================");
        console.log(response.data)
      }

      if(lastEvent.type == "PullRequestEvent") {
        console.log("==============================");
        console.log(response.data)
      }

      if(lastEvent.type == "PushEvent") {

        let ref = lastEvent.payload.ref.split("refs/heads/")[1];
        console.log(">>> ref:", ref);
        console.log(">>> commits:", lastEvent.payload.commits);
        let firstCommit = lastEvent.payload.commits[0]

        githubCli.getData({path:`/repos/k33g/killing-repo/commits/${firstCommit.sha}`})
        .then(response => {
          let filesOfCommit = response.data.files;
          console.log(">>> files:", filesOfCommit);

          let firstFile = filesOfCommit[0]; // do this for all files

          githubCli.getData({path:`/repos/k33g/killing-repo/contents/${firstFile.filename}?ref=${ref}`})
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




          })
        })
      }

    }

  })
  .catch(error => {
    console.log(">>> error:", error)
  })
}, 4000);




// 'If-None-Match: "a18c3bded88eb5dbb5c849a489412bf3"'
