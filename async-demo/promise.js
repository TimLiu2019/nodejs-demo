const p = new Promise((resolve,reject)=>{
    // kick off some async work
   // setTimeout(()=>{resolve(1);},2000);
   setTimeout(()=>{reject(new Error('message'));},2000);
   // reject(new Error('message'));
});

p.then(result => console.log('result',result))
 .catch(err => console.log("Error",err.message));