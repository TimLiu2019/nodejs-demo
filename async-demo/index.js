console.log("before");
// getUser(5, (user)=>{
//     console.log('User',user);
//     getRepositories(user.githubuser, (repos)=>{
//         console.log('reops',repos);
//     });
// });
// getUser(5, (user)=>{
//     console.log('User',user);
//     getRepositories(user.githubuser, (repos)=>{
//         getCommits(repos[0],(commits)=>{
//             console.log(commits);
//         })
//     });
// });
//  getUser(5)
// .then(user => getRepositories(user.githubuser))
// .then(repos => getCommits(repos[0]))
// .then(commits =>console.log('commits',commits))
// .catch(err=>console.log('error',err.message) );

// Async and await appoach
async function displayCommits() {
  try {
    const user = await getUser(4);
    const repos = await getRepositories(user.githubuser);
    const commits = await getCommits(repos[0]);
    console.log("commits", commits);
  } catch (err) {
    console.log("Error", err.message);
  }
}
displayCommits();

console.log("after");
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("reading a db");
      resolve({ id: id, githubuser: "tom" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("user is " + username);
      //  resolve (['repo1','repo2','repo2'])
      reject(new Error("Could not get repos"));
    }, 3000);
  });
}

function getCommits(repo) {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resovle(["commit"]);
    }, 2000);
  });
}
