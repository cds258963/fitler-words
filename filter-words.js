
var fs = require('fs');
var path = __dirname + '/key.txt';
var map = { }; 
fs.readFile(path, 'UTF-8', function (err, data) {

    if (data) {
        var textArr = data.split('|');
        for (var n = 0; n < textArr.length; n++) {
            addWord(textArr[n]);
        }
    } else { 
        console.log('获取词库失败');
    }
});

function addWord(word) {
    var parent = map;
    for (var i = 0; i < word.length; i++) {
        if (!parent[word[i]]) {
            parent[word[i]] = {};
        }
        parent = parent[word[i]];
    }
    parent.isEnd = true;
}

function filter(s, cb) {
    var filterArr = [];
    var parent = map;

    for (var i = 0; i < s.length; i++) {
        //字符串的*时  打断本次循环 进入下个循环
        if (s[i] == '*') {
            continue;
        }
        var found = false;
        var skip = 0;
        var sWord = '';

        for (var j = i; j < s.length; j++) {
            if (!parent[s[j]]) {
                // console.log('skip ', s[j])
                found = false;
                skip = j - i;
                parent = map;
                break;
            }
            sWord = sWord + s[j];
            if (parent[s[j]].isEnd) {
                found = true;
                skip = j - i;
                break;
            }
            parent = parent[s[j]];
        }
        if (skip > 1) {
            i += skip - 1;
        }
        if (!found) {
            continue;
        }
        var stars = '*';
        for (var k = 0; k < skip; k++) {
            stars = stars + '*';
        }
        filterArr.push(sWord);
        var reg = new RegExp(sWord, 'g');
        s = s.replace(reg, stars);
    }
    if (typeof cb === 'function') {
        cb(filterArr, s);
    }
    return s;
}
module.exports = filter;     
  