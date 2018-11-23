
var Q = require('q');
var fs = require('fs');

var qReadFile = Q.denodeify(fs.readFile);
Q.longStackSupport = true;

function getPromise() {
    return qReadFile('./namse.txt');
}

function brokenInCatch() {
    getPromise()                     // attention: promise is not returned to the caller of brokenInCatch()
    .then(function fulfilled() {
        console.log("done")
    })
    .catch(function rejected(err) {
        
       throw new Error('I AM NOT NOTICED'+ err)       // never noticed
    })
 }

 process.on('unhandledRejection', function (err, message) {
     console.log('@@@Unhandled rejectIon::', message);
     console.log('HERE IS THE STACKL:', err.stack);
 })

 function unbrokenCatch() {
    getPromise()
    .then(function fulfilled() {
        console.log("done")
    })
    .catch(function rejected() {
       throw new Error('oops')
    })
 }

 function tryFail() {
    getPromise()                     // attention: promise is not returned to the caller of brokenInCatch()
    .fail(function(err) { console.error('failed here..', err) })
    .fin(function(errorORData) {
        console.log("FIN:", errorORData);
    })
 }
 brokenInCatch();