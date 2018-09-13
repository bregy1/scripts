

var Winston = function() {
    this.log =function(data) {
        console.log(data);
    }
}

module.exports = new Winston();