console.log('before');
getUser(5, (user)=>{
    console.log('User',user);
    getRepositories(user.githubuser, (repos)=>{
        console.log('reops',repos);
    });
});

console.log('after');
function getUser(id,callback){
    setTimeout(()=>{
        console.log('reading a db');
        callback({id:id,githubuser:'tom'});
        },2000);
}

function getRepositories(username, callback){
    setTimeout(()=>{
        console.log('user is '+username);
        callback (['repo1','repo2','repo2'])

    },3000

    );
}