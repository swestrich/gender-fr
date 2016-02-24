'use strict';

var gender = require('./');


var test = require('unit.js');

gender.gendersForNoun('feu', function(err, genders) {
  if (err) {
    throw err;
  }
  test.array(genders).hasValue('m');
});

gender.gendersForNoun('caillou', function(err, genders) {
  if (err) {
    throw err;
  }
  test.array(genders).hasValue('m');
});

gender.gendersForNoun('actrice', function(err, genders) {
  if (err) {
    throw err;
  }
  test.array(genders).hasValue('f');
});

gender.isMasculine('tilleur', function(err, rBool) {
  if (err) {
    throw err;
  }
  test.assert(rBool ===true);
});

gender.isMasculine('tralallalala', function(err, rBool) {
  if (err) {
    throw err;
  }
  test.assert(rBool ===false);
});

gender.definiteArticle('héro', function(err, article) {
  if (err) {
    throw err;
  }
  test.assert(article ==='le');
});

gender.addDefiniteArticle('hystérie', function(err, article) {
  if (err) {
    throw err;
  }
  test.assert(article ==='l\'hystérie');
});

gender.addDefiniteArticle('yttrium', function(err, article) {
  if (err) {
    throw err;
  }
  test.assert(article ==='l\'yttrium');
});

gender.definiteArticle('lampe', function(err, article) {
  if (err) {
    throw err;
  }
  test.assert(article ==='la');
});

gender.addDefiniteArticle('panneau', function(err, article) {
  if (err) {
    throw err;
  }
  test.assert(article ==='le panneau');
});


gender.addDefiniteArticle('aire', function(err, article) {
  if (err) {
    throw err;
  }
  test.assert(article ==='l\'aire');
});

gender.definiteArticle('aire', function(err, article) {
  if (err) {
    throw err;
  }
  test.assert(article ==='l\'');
});

gender.addIndefiniteArticle('lampe', function(err, article) {
  if (err) {
    throw err;
  }
  test.assert(article ==='une lampe');
});

