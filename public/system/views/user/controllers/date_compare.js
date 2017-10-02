/**
 * Created by prasadtajane on 8/15/17.
 */

var arr = [
    new Date("2017-08-22T18:22:39.242Z"), new Date("2017-08-23T18:23:39.242Z"), new Date("2017-08-21T18:21:39.242Z"), new Date("2017-08-20T18:23:39.242Z")
]

var new_arr = arr.filter(function(x) {
    return x < new Date("2017-08-24T18:23:39.242Z");
});

console.log(new_arr.slice(0,3));