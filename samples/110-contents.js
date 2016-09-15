const GitHubClient = require('../GitHubClient.js').GitHubClient;

let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

// search code and display content
githubCli.searchCode({q:'incrementOf1+in:file'}).then(result => {
  console.log(result.total_count, result.incomplete_results)

  result.items.forEach(item => {
    githubCli.fetchContent({
      path: item.path,
      owner: item.repository.owner.login,
      repository: item.repository.name,
      decode: true
    })
    .then(data => {

      console.log(item.path, data.contentText)
    })
    .catch(err => {
      console.error(err)
    })

  })


})
.catch(error => {
  console.log("error", error)
})
