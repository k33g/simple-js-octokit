#!/usr/bin/env node

const GitHubClient = require('../GitHubClient.js').GitHubClient;
let githubCli = new GitHubClient({
  baseUri:"http://github.at.home/api/v3",
  token:process.env.TOKEN_GHE_27_K33G
});

githubCli.fetchStats({type:"all"})
  .then(data => {
    console.log(data)
  })

/*
{ repos:
   { total_repos: 13,
     root_repos: 13,
     fork_repos: 0,
     org_repos: 8,
     total_pushes: 427,
     total_wikis: 1 },
  hooks: { total_hooks: 7, active_hooks: 7, inactive_hooks: 0 },
  pages: { total_pages: 2 },
  orgs:
   { total_orgs: 4,
     disabled_orgs: 0,
     total_teams: 3,
     total_team_members: 16 },
  users: { total_users: 13, admin_users: 2, suspended_users: 0 },
  pulls:
   { total_pulls: 35,
     merged_pulls: 23,
     mergeable_pulls: 8,
     unmergeable_pulls: 0 },
  issues: { total_issues: 72, open_issues: 29, closed_issues: 43 },
  milestones:
   { total_milestones: 13,
     open_milestones: 13,
     closed_milestones: 0 },
  gists: { total_gists: 0, private_gists: 0, public_gists: 0 },
  comments:
   { total_commit_comments: 0,
     total_gist_comments: 0,
     total_issue_comments: 22,
     total_pull_request_comments: 2 } }

*/
