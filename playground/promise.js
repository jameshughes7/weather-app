let asyncAdd = (a, b) => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number') {
                resolve(a + b)
            } else {
                reject('Arguments must be numbers')
            }
        }, 1500); 
     });
};


asyncAdd(5, 7).then((result) => {
    console.log('Result: ', result);
    return asyncAdd(result, '33');
}).then((result) => {
    console.log('Should be 45', result)
}).catch ((errorMessage) => {
    console.log('Error caught: ', errorMessage);
});

let somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hey it worked!');
        // reject('Unable to fulfill promise');
    }, 2000);
});

// resolve is a success or fulfilled
// reject is a failure

// .then is a function that gets called when we attempt to resolve
// 1st argument is called when the proimse is resolved
// 2nd argument is called when the promise is rejected

// can only resolve or reject once
// Once a promise's state has been set, it cannot be changed again. 

// Before a promise has been resolved or rejected, a promise is in a state called 'pending'
// Promise is considered 'settled' once it has been resolved or rejected

// Maximum number of arguments that resolve or reject can take is 1

somePromise.then((message) => {
    console.log('Success: ', message);
}, (errorMessage) => {
    console.log('Error:', errorMessage);
});