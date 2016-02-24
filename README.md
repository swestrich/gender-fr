# Gender-fr

> Finds the gender of french nouns.

## Installation
```
$ npm install --save gender-fr
```

## Usage

```js
var gender = require('gender-fr');

gender.gendersForNoun('actrice', function(err, genders) {
  if (err) {
    throw err;
  }
  //genders=> ['f']
});

gender.isFeminine('maison', function(err, rBool) {
  if (err) {
    throw err;
  }
  //rBool=> true
});

gender.isMasculine('acteur', function(err, rBool) {
  if (err) {
    throw err;
  }
  //rBool=> true
});

gender.definiteArticle('héro', function(err, article) {
  if (err) {
    throw err;
  }
  //article=> le
});

gender.addDefiniteArticle('hystérie', function(err, string) {
  if (err) {
    throw err;
  }
  //string=> l'hystérie;
});

gender.indefiniteArticle('fruit', function(err, article) {
  if (err) {
    throw err;
  }
  //article=> un;
});

gender.addIndefiniteArticle('lampe', function(err, string) {
  if (err) {
    throw err;
  }
  //string=> une lampe;
});

```

## API

### gendersForNoun(str,clb)

#### str

Type: `string`

Get the gender of the french noun.

### isMasculine(str,clb)

#### str

Type: `string`

Is the french noun masculine?

### isFeminine(str,clb)

#### str

Type: `string`

Is the french noun feminine?

### indefiniteArticle(str,clb)

#### str

Type: `string`

Gets the indefinite article for the word (un,une).

### definiteArticle(str,clb)

#### str

Type: `string`

Gets the definite article for the word (l',le,la).

### addIndefiniteArticle(str,clb)

#### str

Type: `string`

Prefixes the indefinite article for the word (un,une) to the word.

### addDefiniteArticle(str,clb)

#### str

Type: `string`

Prefixes the definite article for the word (l',le,la).