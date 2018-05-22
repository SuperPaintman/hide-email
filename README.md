# hideemail

[![Linux Build][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![Commitizen friendly][commitizen-image]][commitizen-url]
[![NPM version][npm-v-image]][npm-url]
[![NPM Downloads][npm-dm-image]][npm-url]


Email addresses characters convertor to HTML entities to protect against spam
bots and crawlers.

A JavaScript port of [Wordpress `antispambot`][wordpress-antispambot-url].


--------------------------------------------------------------------------------


## Installation

```sh
$ npm install --save hideemail
# Or with yarn
$ yarn add hideemail
```


--------------------------------------------------------------------------------


## Usage

```ts
'use strict';
import { hideEmail, hideEmailAlways, hideEmailFactory } from 'hideemail';

const email = 'test.email@gmail.com';

// Depends on random
const encoded = hideEmail(email);
// => "test&#46;e&#109;a&#105;l&#64;&#103;m&#97;&#105;&#108;&#46;c&#111;m"
// or
// => "&#116;e&#115;&#116;.&#101;&#109;a&#105;&#108;&#64;&#103;&#109;ai&#108;&#46;c&#111;&#109;"
// or
// => "t&#101;s&#116;.email&#64;&#103;&#109;&#97;&#105;l.c&#111;&#109;"
// etc. (It depends on random)


// With hex encoding
const encoded = hideEmail(email, true);
// => "&#116;e&#115;t&#46;e&#109;ai&#108;&#64;g%6dail&#46;%63o&#109;"
// or
// => "t&#101;%73t.%65m%61%69%6c%40%67&#109;&#97;%69&#108;.c%6fm"
// or
// => "&#116;&#101;%73&#116;%2ee%6d%61i&#108;&#64;&#103;&#109;ai%6c%2e&#99;%6f&#109;"
// etc. (It depends on random)


// Idempotent (always encodes)
const encoded = hideEmailAlways(email);
// => "&#116;&#101;&#115;&#116;&#46;&#101;&#109;&#97;&#105;&#108;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;"


// Or you can specify your own randomize function (`Math.random` by default)
let i = 0;
const myHideEmail = hideEmailFactory(() => i++ % 2 / 2);

const encoded = myHideEmail(email);
// => "&#116;e&#115;t&#46;e&#109;a&#105;l&#64;g&#109;a&#105;l&#46;c&#111;m"
```

--------------------------------------------------------------------------------


## Build

```sh
$ npm install
$ # or
$ yarn
$
$ npm run build
```


--------------------------------------------------------------------------------

## Test

```sh
$ npm run test
```


--------------------------------------------------------------------------------

## Contributing

1. Fork it (<https://github.com/SuperPaintman/hideemail/fork>)
2. Create your feature branch (`git checkout -b feature/<feature_name>`)
3. Commit your changes (`git commit -am '<type>(<scope>): added some feature'`)
4. Push to the branch (`git push origin feature/<feature_name>`)
5. Create a new Pull Request


--------------------------------------------------------------------------------

## Contributors

- [SuperPaintman](https://github.com/SuperPaintman) SuperPaintman - creator, maintainer


--------------------------------------------------------------------------------

## Changelog
[Changelog][changelog-url]


--------------------------------------------------------------------------------

## License

[MIT][license-url]


[license-url]: https://raw.githubusercontent.com/SuperPaintman/hideemail/master/LICENSE
[changelog-url]: https://raw.githubusercontent.com/SuperPaintman/hideemail/master/CHANGELOG.md
[npm-url]: https://www.npmjs.com/package/hideemail
[npm-v-image]: https://img.shields.io/npm/v/hideemail.svg
[npm-dm-image]: https://img.shields.io/npm/dm/hideemail.svg
[travis-image]: https://img.shields.io/travis/SuperPaintman/hideemail/master.svg?label=linux
[travis-url]: https://travis-ci.org/SuperPaintman/hideemail
[coveralls-image]: https://img.shields.io/coveralls/SuperPaintman/hideemail/master.svg
[coveralls-url]: https://coveralls.io/r/SuperPaintman/hideemail?branch=master
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: https://commitizen.github.io/cz-cli/
[wordpress-antispambot-url]: https://core.trac.wordpress.org/browser/tags/4.9.6/src/wp-includes/formatting.php#L2500
