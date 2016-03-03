'use strict';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname + '/DictionaryModel.sqlite', sqlite3.OPEN_READONLY);
var diacritics = require('diacritics');

function contains(a, obj) {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}

module.exports.gendersForNoun = function(str, clb) {
  db.get("select gender_id from word where word = ?;", [str], function(err, row) {
    var genders = []
    if (row) {
      if (row.gender_id === 1) {
        genders.push('m');
      }
      else if (row.gender_id === 2) {
        genders.push('f');
      }
      else if (row.gender_id === 3) {
        genders.push('m');
        genders.push('f');
      }
    }
    clb(err, genders);
  });
};

module.exports.isMasculine = function(str, clb) {
  this.gendersForNoun(str, function(err, genders) {
    if (err) {
      clb(err);
    }
    else {
      clb(err, contains(genders, 'm'));
    }
  });
};

module.exports.isFeminine = function(str, clb) {
  this.gendersForNoun(str, function(err, genders) {
    if (err) {
      clb(err);
    }
    else {
      clb(err, contains(genders, 'f'));
    }
  });
};

module.exports.startsWithSilentConsonant = function(str, clb) {
  db.get("select has_silent_consonant from word where word = ?;", [str], function(err, row) {
    var has_silent_consonant = false;
    if (row) {
      has_silent_consonant = row.has_silent_consonant;
    }
    clb(err, has_silent_consonant);
  });
};

module.exports.indefiniteArticle = function(str, clb) {
  this.isFeminine(str, function(err, rBool) {
    if (err) {
      clb(err);
    }
    else {
      clb(err, (rBool ? 'une' : 'un'));
    }
  });
};

module.exports.addIndefiniteArticle = function(str, clb) {
  this.indefiniteArticle(str, function(err, rIndefiniteArticle) {
    if (err) {
      clb(err);
    }
    else {
      clb(err, rIndefiniteArticle + ' ' + str);
    }
  });
};

module.exports.definiteArticle = function(str, clb) {
  if (!str) clb(new Error('no string provided'));
  var firstChar = diacritics.remove(str.slice(0, 1))[0];
  var voyelles = ['a', 'e', 'i', 'o', 'u'];
  var hy = ['h', 'y'];
  if (str.length && contains(voyelles, firstChar)) {
    clb(null, 'l\'');
  }
  else if (str.length && contains(hy, firstChar)) {
    var self = this;
    this.startsWithSilentConsonant(str, function(err, rStartsWithSilentConsonant) {
      if (err) {
        return clb(err);
      }
      if (rStartsWithSilentConsonant) {
        clb(null, 'l\'');
      }
      else {
        self.isFeminine(str, function(err, rBool) {
          if (err) {
            clb(err);
          }
          else {
            clb(err, (rBool ? 'la' : 'le'));
          }
        });
      }
    });
  }
  else {
    this.isFeminine(str, function(err, rBool) {
      if (err) {
        clb(err);
      }
      else {
        clb(err, (rBool ? 'la' : 'le'));
      }
    });
  }
};

module.exports.addDefiniteArticle = function(str, clb) {
  this.definiteArticle(str, function(err, rDefiniteArticle) {
    if (err) {
      clb(err);
    }
    else {
      var lastChar = rDefiniteArticle.charAt(rDefiniteArticle.length - 1);
      clb(err, rDefiniteArticle + ((lastChar === '\'') ? '' : ' ') + str);
    }
  });
};